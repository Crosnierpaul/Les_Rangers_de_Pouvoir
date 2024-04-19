document.addEventListener("DOMContentLoaded", function() {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const hours = ['13h00 - 13h30', '13h30 - 14h00'];

    const calendarBody = document.getElementById('calendarBody');

    // Fonction pour vérifier si un créneau est déjà réservé dans la base de données
    function checkReservation(day, hour) {
        return fetch('http://localhost:3000/checkReservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ day, hour })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la vérification de la réservation');
            }
            return response.json();
        })
        .then(data => {
            return data.reserved; // Renvoie true si le créneau est réservé, false sinon
        })
        .catch(error => {
            console.error('Erreur lors de la vérification de la réservation :', error);
            return false; // En cas d'erreur, considérez que le créneau n'est pas réservé
        });
    }

    // Générer les créneaux horaires
    hours.forEach(hour => {
        const row = document.createElement('tr');
        const hourCell = document.createElement('td');
        hourCell.textContent = hour;
        row.appendChild(hourCell);

        days.forEach(day => {
            const timeSlot = document.createElement('td');
            timeSlot.classList.add('time-slot');
            timeSlot.setAttribute('data-day', day);
            timeSlot.setAttribute('data-hour', hour);
            row.appendChild(timeSlot);

            // Vérifier si le créneau est déjà réservé
            checkReservation(day, hour).then(isReserved => {
                if (isReserved) {
                    timeSlot.classList.add('reserved');
                } else {
                    // Si le créneau n'est pas réservé, ajouter l'écouteur d'événements clic
                    timeSlot.addEventListener('click', function() {
                        handleReservation.call(this, day, hour);
                    });
                }
            });
        });

        calendarBody.appendChild(row);
    });

    // Fonction pour gérer les réservations lors d'un clic sur un créneau horaire
    function handleReservation(day, hour) {
        const isReserved = this.classList.contains('reserved');

        if (isReserved) {
            alert(`Ce créneau est déjà réservé. Veuillez choisir un autre créneau.`);
            return;
        }

        // Réserver le créneau
        this.classList.add('reserved');
        sendDataToDatabase({ [hour]: { [day]: true } });
    }

    // Fonction pour envoyer les données à la base de données
    function sendDataToDatabase(data) {
        const apiUrl = 'http://localhost:3000/reservations';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête HTTP');
                }
                return response.json();
            })
            .then(data => {
                console.log('Réponse de l\'API backend :', data);
            })
            .catch(error => {
                console.error('Erreur lors de la communication avec l\'API backend :', error);
            });
    }
});

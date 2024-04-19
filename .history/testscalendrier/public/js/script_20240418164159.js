document.addEventListener("DOMContentLoaded", function() {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const hours = ['13h00 - 13h30', '13h30 - 14h00'];

    const calendarBody = document.getElementById('calendarBody');

    // Créer une grille pour suivre les réservations
    const reservations = {};
    hours.forEach(hour => {
        reservations[hour] = {};
        days.forEach(day => {
            reservations[hour][day] = false; // initialiser toutes les cases comme non réservées
        });
    });

    // Fonction pour récupérer les réservations existantes
    function fetchReservations() {
        fetch('http://localhost:3000/getReservations')
            .then(response => response.json())
            .then(data => {
                // Mettez à jour l'interface utilisateur pour afficher les réservations existantes
                data.reservations.forEach(reservation => {
                    const { hour, day } = reservation;
                    const timeSlot = document.querySelector(`.time-slot[data-day="${day}"][data-hour="${hour}"]`);
                    if (timeSlot) {
                        timeSlot.classList.add('reserved');
                    }
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des réservations :', error));
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
        });

        calendarBody.appendChild(row);
    });

    function handleReservation() {
        const day = this.getAttribute('data-day');
        const hour = this.getAttribute('data-hour');
        const isReserved = this.classList.contains('reserved');
    
        if (isReserved) {
            const confirmation = window.confirm(`Vous avez déjà réservé un créneau pour le ${day} à ${hour}. Voulez-vous changer de créneau ?`);
            if (confirmation) {
                // Annulez la réservation
                this.classList.remove('reserved');
                sendDataToDatabase({ [hour]: { [day]: false } }); // Mettez à jour la base de données
            }
        } else {
            // Vérifiez si le créneau est disponible dans la base de données
            fetch('http://localhost:3000/checkReservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ day, hour })
            })
            .then(response => response.json())
            .then(data => {
                if (data.reserved) {
                    // Affichez un message d'erreur si le créneau est déjà réservé
                    alert(`Le créneau pour le ${day} à ${hour} est déjà réservé. Veuillez choisir un autre créneau.`);
                } else {
                    // Confirmez la réservation
                    const confirmation = window.confirm(`Voulez-vous réserver le créneau pour le ${day} à ${hour} ?`);
                    if (confirmation) {
                        // Réservez le créneau
                        this.classList.add('reserved');
                        sendDataToDatabase({ [hour]: { [day]: true } }); // Enregistrez la réservation dans la base de données
                    }
                }
            })
            .catch(error => console.error('Erreur lors de la vérification de la réservation :', error));
        }
    }
    // Gérer les clics sur les créneaux horaires
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', handleReservation);
    });

    
        // Appel de la fonction pour récupérer les réservations existantes au chargement de la page
    fetchReservations();
});

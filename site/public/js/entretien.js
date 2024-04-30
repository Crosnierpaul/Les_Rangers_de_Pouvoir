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
            // Ajouter un gestionnaire d'événements pour la réservation au clic sur chaque créneau horaire
            timeSlot.addEventListener('click', () => {
                // Récupérer le jour et l'heure du créneau cliqué
                const selectedDay = timeSlot.getAttribute('data-day');
                const selectedHour = timeSlot.getAttribute('data-hour');

                // Demander à l'utilisateur son nom et son numéro de téléphone
                const name = prompt("Veuillez saisir votre nom :");
                let phoneNumber;
                
                // Validation du numéro de téléphone avec une expression régulière
                const phoneNumberPattern = /^0\d{9}$/; // Format : commençant par 0 suivi de 9 chiffres

                do {
                    phoneNumber = prompt("Veuillez saisir votre numéro de téléphone (10 chiffres commençant par 0 sans espaces) :");
                    // Vérifier si l'utilisateur a annulé
                    if (phoneNumber === null) {
                        // L'utilisateur a annulé, sortir de la fonction
                        return;
                    }
                } while (!phoneNumberPattern.test(phoneNumber));
                
                // Envoyer les détails de la réservation et les informations de l'utilisateur au serveur
                const reservationDetails = {
                    day: selectedDay,
                    hour: selectedHour,
                    name: name,
                    phoneNumber: phoneNumber
                };
                fetch('/entretiens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservationDetails),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to create reservation');
                    }
                    // La réservation a été créée avec succès
                    console.log('Reservation created successfully');
                    // Vous pouvez ajouter ici des actions supplémentaires, comme mettre à jour l'interface utilisateur, etc.
                    // Afficher le message de confirmation à l'utilisateur
                    alert('Votre réservation a été effectuée avec succès!');
                })
                .catch(error => {
                    console.error('Error creating reservation:', error.message);
                    // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
                    alert('Erreur lors de la réservation');
                });
            });
            row.appendChild(timeSlot);
        });

        calendarBody.appendChild(row);
    });
});

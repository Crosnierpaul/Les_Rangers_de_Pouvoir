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
            row.appendChild(timeSlot);
        });

        calendarBody.appendChild(row);
    });

    // Gérer les clics sur les créneaux horaires
    const timeSlots = document.querySelectorAll('.time-slot');
    let reservationMade = false; // Indique si une réservation a déjà été effectuée
    let lastReservedSlot = null; // Garde une trace du dernier créneau réservé

    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            const hour = this.getAttribute('data-hour');
            const isReserved = reservations[hour][day];

            if (reservationMade && !isReserved) {
                alert(`Vous avez déjà réservé un créneau. Veuillez d'abord annuler la réservation existante.`);
                return;
            }

            if (isReserved) {
                const confirmation = window.confirm(`Vous avez déjà réservé un créneau pour le ${day} à ${hour}. Voulez-vous changer de créneau ?`);
                if (confirmation) {
                    // Supprimer l'ancien créneau réservé
                    lastReservedSlot.classList.remove('reserved');
                    reservations[lastReservedSlot.getAttribute('data-hour')][lastReservedSlot.getAttribute('data-day')] = false;

                    // Réserver le nouveau créneau
                    this.classList.add('reserved');
                    reservations[hour][day] = true;
                    alert(`Nouveau créneau réservé pour le ${day} à ${hour}`);
                    reservationMade = true;
                    lastReservedSlot = this;
                }
            } else {
                // Réserver le créneau
                this.classList.add('reserved');
                reservations[hour][day] = true;
                alert(`Créneau réservé pour le ${day} à ${hour}`);
                reservationMade = true;
                lastReservedSlot = this;
            }
        });
    });
});

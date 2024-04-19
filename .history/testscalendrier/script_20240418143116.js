document.addEventListener("DOMContentLoaded", function() {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const hours = ['13h00 - 13h30', '13h30 - 14h00'];

    const calendarBody = document.getElementById('calendarBody');

    // Générer les créneaux horaires
    for (let i = 0; i < hours.length; i++) {
        const row = document.createElement('tr');
        
        // Ajouter les heures
        if (i === 0) {
            const timeHeader = document.createElement('th');
            timeHeader.textContent = 'Heure';
            row.appendChild(timeHeader);
        } else {
            const hourCell = document.createElement('td');
            hourCell.textContent = hours[i - 1];
            row.appendChild(hourCell);
        }
        
        // Ajouter les jours
        for (let j = 0; j < days.length; j++) {
            if (i === 0) {
                const dayHeader = document.createElement('th');
                dayHeader.textContent = days[j];
                row.appendChild(dayHeader);
            } else {
                const timeSlot = document.createElement('td');
                timeSlot.classList.add('time-slot');
                timeSlot.setAttribute('data-day', days[j]);
                timeSlot.setAttribute('data-hour', hours[i - 1]);
                row.appendChild(timeSlot);
            }
        }
        
        calendarBody.appendChild(row);
    }

    // Ajouter un événement de clic sur les créneaux horaires
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            const hour = this.getAttribute('data-hour');
            alert(`Créneau réservé pour le ${day} à ${hour}`);
            // Ici, vous pouvez ajouter la logique pour enregistrer la réservation dans la base de données
        });
    });
});

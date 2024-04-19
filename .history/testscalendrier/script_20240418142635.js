document.addEventListener("DOMContentLoaded", function() {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const hours = ['13h00 - 13h30', '13h30 - 14h00'];

    const calendarBody = document.getElementById('calendarBody');

    // Générer en-têtes de jours
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.textContent = day;
        calendarBody.appendChild(dayHeader);
    });

    // Générer les créneaux horaires
    for (let i = 0; i < hours.length; i++) {
        for (let j = 0; j < days.length; j++) {
            const timeSlot = document.createElement('div');
            timeSlot.classList.add('time-slot');
            timeSlot.setAttribute('data-day', days[j]);
            timeSlot.setAttribute('data-hour', hours[i]);
            timeSlot.textContent = hours[i];
            calendarBody.appendChild(timeSlot);
        }
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

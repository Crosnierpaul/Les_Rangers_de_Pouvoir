window.onload = () => {
    fetchWeeks(); // Chargement des semaines au chargement de la page
    document.getElementById('reservationForm').addEventListener('submit', submitReservation);
};

async function fetchWeeks() {
    try {
        const response = await fetch('/weeks');
        const weeks = await response.json();
        displayWeeks(weeks);
    } catch (error) {
        console.error('Error fetching weeks:', error);
    }
}

function displayWeeks(weeks) {
    const weekSelect = document.getElementById('week');
    weekSelect.innerHTML = '';

    weeks.forEach(week => {
        const option = document.createElement('option');
        option.value = week._id;
        option.textContent = `${week.date_debut} - ${week.date_fin}`;
        weekSelect.appendChild(option);
    });
}

async function submitReservation(event) {
    event.preventDefault(); // Empêcher le formulaire de soumettre de manière classique

    const formData = new FormData(event.target); // Obtenir les données du formulaire
    const reservationData = {
        name: formData.get('name'),
        week: formData.get('week')
    };

    try {
        const response = await fetch('/weeks/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        });

        if (response.ok) {
            console.log('Reservation successful');
            // Réinitialiser le formulaire ou afficher un message de succès
        } else {
            console.error('Reservation failed');
            // Afficher un message d'erreur
        }
    } catch (error) {
        console.error('Error submitting reservation:', error);
        // Afficher un message d'erreur
    }
}

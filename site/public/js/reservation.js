window.onload = () => {
    fetchWeeks();
    document.getElementById('reservationForm').addEventListener('submit', submitReservation);
};

//----------- Requête Weeks  -----------//
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

//----------- Requête Weeks Reservation  -----------//
async function submitReservation(event) {
    event.preventDefault();

    const formData = new FormData(event.target); 
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
            alert('Réservation réussie !');
        } else {
            alert('La réservation a échoué.');
        }
    } catch (error) {
        console.error('Error submitting reservation:', error);
        alert('Une erreur est survenue lors de la réservation.');
    }
}
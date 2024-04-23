window.onload = () => {
    fetchWeeks();
    document.getElementById('reservationForm').addEventListener('submit', submitReservation);
};

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

function findWeekById(weekId) {
    const weekSelect = document.getElementById('week');
    const weeks = weekSelect.getElementsByTagName('option');

    for (const week of weeks) {
        if (week.value === weekId) {
            return {
                date_debut: week.textContent.split(' - ')[0],
                date_fin: week.textContent.split(' - ')[1]
            };
        }
    }

    return null;
}

//----------- Requête Semaines -----------//
async function fetchWeeks() {
    try {
        const response = await fetch('/semaines');
        const weeks = await response.json();
        displayWeeks(weeks);
    } catch (error) {
        console.error('Error fetching weeks:', error);
    }
}

//----------- Requête Reservatinons -----------//
async function submitReservation(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.elements['name'].value;
    const weekId = form.elements['week'].value;

    // Récupérer les informations de la semaine sélectionnée
    const selectedWeek = findWeekById(weekId);

    if (!selectedWeek) {
        console.error('Week not found');
        return;
    }

    const startDate = selectedWeek.date_debut;
    const endDate = selectedWeek.date_fin;

    try {
        const response = await fetch('/reservations/reserver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, startDate, endDate })
        });

        if (response.status === 201) {
            const data = await response.json();
            console.log(data);
            alert('Réservation réussie')
            // Afficher un message de réussite si nécessaire
        } else if (response.status === 400) {
            const data = await response.json();
            alert(data.message); // Afficher le message d'erreur
        } else {
            console.error('Unexpected error:', response.statusText);
        }
    } catch (error) {
        console.error('Error submitting reservation:', error);
    }
}
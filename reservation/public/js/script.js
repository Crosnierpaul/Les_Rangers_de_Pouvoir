window.onload = fetchWeeks;

//----------- Requête Get Weeks -----------//
async function fetchWeeks() {
    try {
        const response = await fetch('/weeks');
        const weeks = await response.json();
        displayWeeks(weeks);
    } catch (error) {
        console.error('Error fetching weeks:', error);
    }
}

// Afficher les semaines dans le tableau HTML
function displayWeeks(weeks) {
    const weekList = document.getElementById('weekList');
    weekList.innerHTML = '';

    weeks.forEach(week => {
        const row = document.createElement('tr');
        const startDateCell = document.createElement('td');
        startDateCell.textContent = week.date_debut;
        const endDateCell = document.createElement('td');
        endDateCell.textContent = week.date_fin;

        row.appendChild(startDateCell);
        row.appendChild(endDateCell);

        weekList.appendChild(row);
    });
}

window.onload = fetchWeeks;
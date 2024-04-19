window.onload = fetchWeeks;

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
    const weekSelect = document.getElementById('weekSelect');
    weekSelect.innerHTML = '';

    weeks.forEach(week => {
        const option = document.createElement('option');
        option.value = week._id;
        option.textContent = `${week.date_debut} - ${week.date_fin}`;
        weekSelect.appendChild(option);
    });
}

// admin.js

window.onload = () => {
    fetchReservations();
};

async function fetchReservations() {
    try {
        const response = await fetch('/weeks/reservations');
        const reservations = await response.json();
        displayReservations(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        // Gérer l'erreur de manière appropriée, par exemple afficher un message à l'utilisateur
    }
}

function displayReservations(reservations) {
    const reservationContainer = document.getElementById('reservationContainer');
    reservationContainer.innerHTML = ''; // Effacer le contenu précédent

    reservations.forEach(reservation => {
        const reservationElement = document.createElement('div');
        reservationElement.classList.add('reservation');

        const nameElement = document.createElement('p');
        nameElement.textContent = `Nom : ${reservation.name}`;
        reservationElement.appendChild(nameElement);

        const weekElement = document.createElement('p');
        weekElement.textContent = `Semaine : ${reservation.week}`;
        reservationElement.appendChild(weekElement);

        reservationContainer.appendChild(reservationElement);
    });
}

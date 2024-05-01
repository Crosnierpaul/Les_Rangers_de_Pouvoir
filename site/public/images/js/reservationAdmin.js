window.onload = () => {
//----------- Requête Reservations  -----------//
    const loadReservations = async () => {
        try {
            const response = await fetch('/reservations');
            const data = await response.json();
            console.log(response)
            // Sélectionner le corps du tableau
            const reservationsBody = document.getElementById('reservationsBody');
            
            // Vider le corps du tableau
            reservationsBody.innerHTML = '';

            // Ajouter chaque réservation au tableau
            data.forEach(reservation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${reservation.name}</td>
                    <td>${reservation.startDate}</td>
                    <td>${reservation.endDate}</td>
                `;
                reservationsBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erreur lors du chargement des réservations :', error);
        }
    };

    loadReservations();
};


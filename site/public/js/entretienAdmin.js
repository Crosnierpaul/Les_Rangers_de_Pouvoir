fetch('/entretiens/liste')
    .then(response => response.json())
    .then(entretiens => {
        // Convertir les dates en objets Date JavaScript
        entretiens.forEach(entretien => {
            const [day, month, year] = entretien.day.split(' ');
            const dateObject = new Date(`${year}-${getMonthNumber(month)}-${day}`);
            entretien.dateObject = dateObject;

            // Convertir l'heure en objet d'heure pour faciliter le tri
            const [startHour] = entretien.hour.split(' - ');
            entretien.startHour = startHour;
        });

        // Filtrer les entretiens pour ne garder que ceux qui sont après aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Mettre à minuit pour la comparaison de la date uniquement
        entretiens = entretiens.filter(entretien => entretien.dateObject >= today);

        // Trier les entretiens par date puis par heure, en mettant "13h - 13h30" en premier si présent
        entretiens.sort((a, b) => {
            if (a.dateObject.getTime() !== b.dateObject.getTime()) {
                return a.dateObject - b.dateObject;
            } else if (a.startHour === '13h' && b.startHour !== '13h') {
                return -1;
            } else if (a.startHour !== '13h' && b.startHour === '13h') {
                return 1;
            } else {
                return 0;
            }
        });

        // Afficher les entretiens triés dans la table
        const entretiensTableBody = document.getElementById('entretiensTableBody');
        entretiens.forEach(entretien => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${entretien.lastName}</td>
                <td>${entretien.firstName}</td>
                <td>${entretien.phoneNumber}</td>
                <td>${entretien.hour}</td>
                <td>${entretien.day}</td>
            `;
            entretiensTableBody.appendChild(tr);
        });
    })
    .catch(error => console.error('Error fetching entretiens:', error));

// Fonction utilitaire pour obtenir le numéro du mois à partir de son nom
function getMonthNumber(monthName) {
    const months = {
        'Janvier': 1, 'Février': 2, 'Mars': 3, 'Avril': 4, 'Mai': 5, 'Juin': 6,
        'Juillet': 7, 'Août': 8, 'Septembre': 9, 'Octobre': 10, 'Novembre': 11, 'Décembre': 12
    };
    return months[monthName];
}

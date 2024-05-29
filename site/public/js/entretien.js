let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
const timeSlots = ['13h - 13h30', '13h30 - 14h']; // Options d'horaires


function disableButtons() {
    document.querySelectorAll('.btn-container').forEach(btn => {
        btn.classList.add('disabled');
    });
}

function enableButtons() {
    document.querySelectorAll('.btn-container').forEach(btn => {
        btn.classList.remove('disabled');
    });
}

async function displayCalendar(month, year) {
    const calendarContainer = document.getElementById('calendarContainer');
    const animationcontainer = document.getElementById('animationcontainer');
    
    disableButtons();

    // Afficher le animationcontainer
    animationcontainer.style.display = 'block';
    calendarContainer.innerHTML = '';

    setTimeout(async () => {
        const firstDay = new Date(year, month, 1);
        const monthName = months[firstDay.getMonth()];
        const yearNum = firstDay.getFullYear();

        // Correction pour obtenir le premier jour correct du mois
        let firstDayOfWeek = firstDay.getDay(); // Renvoie 0 pour dimanche, 1 pour lundi, etc.

        // Décaler le premier jour vers la gauche si nécessaire
        if (firstDayOfWeek === 0) {
            firstDayOfWeek = 6; // Si le premier jour est un dimanche, décaler vers la gauche d'une colonne
        } else {
            firstDayOfWeek--; // Décaler d'une colonne vers la gauche
        }

        const calendarDiv = document.createElement('div');
        calendarDiv.classList.add('calendar');
        calendarDiv.innerHTML = `<h2>${monthName} ${yearNum}</h2>`;

        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

        daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let currentDay = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDayOfWeek) {
                    cell.innerHTML = '&nbsp;';
                } else if (currentDay <= daysInMonth) {
                    cell.textContent = currentDay;
                    cell.id = `cell-${currentDay}`;

                    // Convertir la date en objet Date JavaScript pour la comparaison
                    const currentDate = new Date(year, month, currentDay);
                    const formattedDate = `${currentDay} ${months[month]} ${year}`;
                    const reservations = await fetch(`/entretiens/liste/${formattedDate}`);
                    // const reservations = await fetch(`/entretiens/liste?day=${formattedDate}`);
                    const reservationsData = await reservations.json();
                    if (reservationsData.length >= 2 || currentDate < new Date()) {
                        cell.classList.add('inactive');
                    } else {
                        cell.addEventListener('click', () => selectCell(cell));
                    }

                    currentDay++;
                } else {
                    cell.innerHTML = '&nbsp;';
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        enableButtons();
        // Masquer le animationcontainer une fois le calendrier chargé
        animationcontainer.style.display = 'none';
        
        calendarDiv.appendChild(table);
        calendarContainer.appendChild(calendarDiv);
    }, 400); // Délai de 2 secondes
}

function selectCell(cell) {
    // Supprimer toute sélection précédente
    const selectedCells = document.querySelectorAll('.selected');
    selectedCells.forEach(selectedCell => {
        selectedCell.classList.remove('selected');
    });

    // Ajouter la classe de sélection à la cellule cliquée
    cell.classList.add('selected');

    // Récupérer la date sélectionnée
    const selectedDate = `${cell.textContent} ${months[currentMonth]} ${currentYear}`;

    // Afficher la date sélectionnée
    const selectedContent = document.getElementById('selectedContent');
    selectedContent.innerHTML = `<h1>Date sélectionnée :</h1><h2>${selectedDate}</h1>`;

    // Ajouter des champs de saisie pour le nom, prénom et numéro de téléphone
    const inputFields = `
        <h2 class='left'>Remplissez vos informations :</h2>
        <label for="firstName">Prénom :</label>
        <input type="text" id="firstName" name="firstName" required><br><br>
        <label for="lastName">Nom :</label>
        <input type="text" id="lastName" name="lastName" required><br><br>
        <label for="phoneNumber">Numéro de téléphone :</label>
        <input type="text" id="phoneNumber" name="phoneNumber" required><br><br>
    `;
    selectedContent.innerHTML += inputFields;

    // Afficher les options d'horaires
    const timeSlotOptions = timeSlots.map(slot => `<option>${slot}</option>`).join('');
    const timeSlotSelector = `
        <h2 class='left'>Choisissez un horaire :</h2>
        <select id="timeSlot">
            ${timeSlotOptions}
        </select>
        <div class="btn-clasic" onclick="reserver()">
            <a class="btn-content btn-clasiccontent" href="#">
                <span class="btn-title">Réserver</span>
            </a>
        </div>
    `;
    selectedContent.innerHTML += timeSlotSelector;
}

function prevMonth() {
    if (currentMonth === 0) {
        prevYear(); // Si c'est janvier, décrémentez l'année à la place
    } else {
        currentMonth--;
        displayCalendar(currentMonth, currentYear);
    }
}

function nextMonth() {
    if (currentMonth === 11) {
        nextYear();
    } else {
        currentMonth++;
        displayCalendar(currentMonth, currentYear);
    }
}

function prevYear() {
    currentYear--;
    currentMonth = 11;
    displayCalendar(currentMonth, currentYear);
}

function nextYear() {
    currentYear++;
    currentMonth = 0;
    displayCalendar(currentMonth, currentYear);
}

function reserver() {
    // Récupérer les données sélectionnées
    const selectedDay = document.querySelector('.selected').textContent;
    const selectedHour = document.getElementById('timeSlot').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Vérifier que le numéro de téléphone commence par un zéro et comporte 10 chiffres
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert("Le numéro de téléphone doit commencer par 0 et comporter 10 chiffres");
        return; // Arrêter l'exécution de la fonction si la validation échoue
    }

    // Créer un objet contenant les données
    const reservationData = {
        day: `${selectedDay} ${months[currentMonth]} ${currentYear}`,
        hour: selectedHour,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
    };

    fetch('/entretiens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    })
    .then(response => {
        if (response.status === 201) {
            alert('Réservation effectuée avec succès');
            // Réinitialiser les champs après la réservation réussie
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('phoneNumber').value = '';
        } else if (response.status === 409) {
            throw new Error('Il existe déjà une réservation pour cette heure');
        } else {
            throw new Error('Erreur lors de la réservation');
        }
    })
    .catch(error => {
        console.error('Erreur :', error.message);
        alert(error.message);
    });
    
}

displayCalendar(currentMonth, currentYear);
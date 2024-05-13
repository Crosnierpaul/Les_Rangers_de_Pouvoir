document.addEventListener("DOMContentLoaded", function() {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const hours = ['13h00 - 13h30', '13h30 - 14h00'];

    const calendarBody = document.getElementById('calendarBody');

    // Créer une grille pour suivre les réservations
    const reservations = {};
    hours.forEach(hour => {
        reservations[hour] = {};
        days.forEach(day => {
            reservations[hour][day] = false; // initialiser toutes les cases comme non réservées
        });
    });

    // Générer les créneaux horaires
    hours.forEach(hour => {
        const row = document.createElement('tr');
        const hourCell = document.createElement('td');
        hourCell.textContent = hour;
        row.appendChild(hourCell);

        days.forEach(day => {
            const timeSlot = document.createElement('td');
            timeSlot.classList.add('time-slot');
            timeSlot.setAttribute('data-day', day);
            timeSlot.setAttribute('data-hour', hour);
            // Ajouter un gestionnaire d'événements pour la réservation au clic sur chaque créneau horaire
            timeSlot.addEventListener('click', () => {
                // Récupérer le jour et l'heure du créneau cliqué
                const selectedDay = timeSlot.getAttribute('data-day');
                const selectedHour = timeSlot.getAttribute('data-hour');

                // Demander à l'utilisateur son nom et son numéro de téléphone
                const name = prompt("Veuillez saisir votre nom :");
                let phoneNumber;
                
                // Validation du numéro de téléphone avec une expression régulière
                const phoneNumberPattern = /^0\d{9}$/; // Format : commençant par 0 suivi de 9 chiffres

                do {
                    phoneNumber = prompt("Veuillez saisir votre numéro de téléphone (10 chiffres commençant par 0 sans espaces) :");
                } while (!phoneNumberPattern.test(phoneNumber));
                
                // Envoyer les détails de la réservation et les informations de l'utilisateur au serveur
                const reservationDetails = {
                    day: selectedDay,
                    hour: selectedHour,
                    name: name,
                    phoneNumber: phoneNumber
                };
                fetch('/entretiens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservationDetails),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to create reservation');
                    }
                    // La réservation a été créée avec succès
                    console.log('Reservation created successfully');
                    // Vous pouvez ajouter ici des actions supplémentaires, comme mettre à jour l'interface utilisateur, etc.
                })
                .catch(error => {
                    console.error('Error creating reservation:', error.message);
                    // Gérer l'erreur, par exemple, afficher un message à l'utilisateur
                });
            });
            row.appendChild(timeSlot);
        });

        calendarBody.appendChild(row);
    });
<<<<<<< Updated upstream
});
=======

    // Ajouter la classe de sélection à la cellule cliquée
    cell.classList.add('selected');

    // Récupérer la date sélectionnée
    const selectedDate = `${cell.textContent} ${months[currentMonth]} ${currentYear}`;

    // Afficher la date sélectionnée
    const selectedContent = document.getElementById('selectedContent');
    selectedContent.innerHTML = `<h2>Date sélectionnée :</h2><p>${selectedDate}</p>`;

    // Ajouter des champs de saisie pour le nom, prénom et numéro de téléphone
    
    const inputFields = `
        <h2>Remplissez vos informations :</h2>
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
        <h2>Choisissez un horaire :</h2>
        <select id="timeSlot">
            ${timeSlotOptions}
        </select>
        <div class="btn-clasic" onclick="reserver()">
        <a class="btn-content btn-clasiccontent" href="#">
          <span class="btn-title">Réserver</span>

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
>>>>>>> Stashed changes

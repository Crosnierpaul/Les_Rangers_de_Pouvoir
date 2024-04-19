const mongoose = require('mongoose');

// Définition du schéma de réservation
const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    week: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Week',
        required: true
    },
    // Vous pouvez ajouter d'autres champs de réservation ici
});

// Création du modèle de réservation à partir du schéma
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

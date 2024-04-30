const mongoose = require('mongoose');

// Schéma d'entretien
const entretienSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    // Nouveaux champs pour le nom et le numéro de téléphone
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    // Autres champs d'entretien si nécessaire
}, { timestamps: true });

// Modèle d'entretien
const Entretien = mongoose.model('Entretien', entretienSchema);

module.exports = Entretien;

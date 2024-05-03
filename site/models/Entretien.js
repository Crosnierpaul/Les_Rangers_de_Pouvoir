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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Modèle d'entretien
const Entretien = mongoose.model('Entretien', entretienSchema);

module.exports = Entretien;
const express = require('express');
const router = express.Router();
const Entretien = require('../models/Entretien');

// Créer une réservation avec nom, prénom et numéro de téléphone
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        // Récupérer les données de la réservation depuis le corps de la requête
        const { day, hour, firstName, lastName, phoneNumber } = req.body;

        // Créer une nouvelle instance de réservation avec nom, prénom et numéro de téléphone
        const nouvelleReservation = new Entretien({
            day,
            hour,
            firstName,
            lastName,
            phoneNumber
        });

        // Sauvegarder la réservation dans la base de données
        const reservationEnregistree = await nouvelleReservation.save();

        // Répondre avec la réservation enregistrée
        res.status(201).json(reservationEnregistree);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur 500 et un message d'erreur
        res.status(500).json({ error: error.message });
    }
});

// Récupérer tous les entretiens
router.get('/liste', async (req, res) => {
    try {
        // Récupérer tous les entretiens depuis la base de données
        const entretiens = await Entretien.find();

        // Renvoyer les entretiens au format JSON
        res.json(entretiens);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur 500 et un message d'erreur
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

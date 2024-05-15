const express = require('express');
const router = express.Router();
const Entretien = require('../models/Entretien');

//----------- POST Commande Entretien -----------//
router.post('/', async (req, res) => {
    try {
        // Récupérer les données de la réservation depuis le corps de la requête
        const { day, hour, firstName, lastName, phoneNumber } = req.body;

        // Vérifier s'il existe déjà une réservation pour le même jour et la même heure
        const existingReservation = await Entretien.findOne({ day, hour });

        if (existingReservation) {
            // Si une réservation existe déjà, renvoyer une erreur 409 (Conflit)
            return res.status(409).json({ error: "Il existe déjà une réservation pour cette heure" });
        }

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


//----------- GET Commande Entretien -----------//
router.get('/liste/:day', async (req, res) => {
    const day = req.params.day;

    try {
        const entretiens = await Entretien.find({ day: day });
        res.json(entretiens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Reservation = require('../models/Reservation');

//----------- GET Commande Get Weeks -----------//
router.get('/', async (req, res) => {
    try {
        // Récupérer toutes les réservations depuis le modèle Reservation
        const reservations = await Reservation.find();

        // Retourner les données JSON des réservations
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching weeks:', error);
        res.status(500).send('Internal Server Error');
    }
});


//----------- POST Commande Reservation -----------//
router.post('/reserver', async (req, res) => {
    try {
        const { name, startDate, endDate } = req.body;

        // Convertir les dates en format ISO 8601 sans l'heure ni le fuseau horaire
        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

        // Vérifier le nombre de réservations pour la semaine sélectionnée
        const reservationsCount = await Reservation.countDocuments({ startDate: formattedStartDate, endDate: formattedEndDate });

        if (reservationsCount >= 3) {
            return res.status(400).json({ message: 'Le nombre maximum de réservations pour cette semaine a été atteint.' });
        }

        // Créer une nouvelle réservation
        const newReservation = new Reservation({
            name,
            startDate: formattedStartDate,
            endDate: formattedEndDate
        });

        await newReservation.save();

        res.status(201).json({ message: 'Réservation réussie', reservation: newReservation });
    } catch (error) {
        console.error('Erreur lors de la soumission de la réservation :', error);
        res.status(500).json({ message: 'Erreur Interne du Serveur' });
    }
});

module.exports = router;
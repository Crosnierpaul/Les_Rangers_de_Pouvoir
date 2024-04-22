const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Reservation = require('../models/Reservation');

//----------- GET Commande Get Weeks -----------//
router.get('/', async (req, res) => {
    try {
        const weeks = await mongoose.connection.collection('semaines').find().toArray();
        res.json(weeks);
    } catch (error) {
        console.error('Error fetching weeks:', error);
        res.status(500).send('Internal Server Error');
    }
});

//----------- POST Commande Reservation -----------//
router.post('/reservation', async (req, res) => {
    try {
        const { name, week } = req.body;

        // Vérifier le nombre de réservations pour cette semaine
        const reservationsCount = await Reservation.countDocuments({ week });
        if (reservationsCount >= 3) {
            return res.status(400).json({ message: 'Maximum reservations reached for this week' });
        }

        // Créer une nouvelle réservation
        const newReservation = new Reservation({
            name,
            week,
        });

        await newReservation.save();

        res.status(201).json({ message: 'Reservation successful', reservation: newReservation });
    } catch (error) {
        console.error('Error submitting reservation:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
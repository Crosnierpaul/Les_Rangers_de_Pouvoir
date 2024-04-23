const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//----------- Connect to MongoDB -----------//
mongoose.connect('mongodb://localhost:27017/reservation', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

//----------- Middleware -----------//
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//----------- Routes -----------//
app.get('/', async (req, res) => {
    try {
        // Récupérer les semaines de la base de données
        const weeks = await mongoose.connection.collection('semaines').find().toArray();
        // Renvoyer les semaines à la page HTML
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } catch (error) {
        console.error('Error fetching weeks:', error);
        res.status(500).send('Internal Server Error');
    }
});

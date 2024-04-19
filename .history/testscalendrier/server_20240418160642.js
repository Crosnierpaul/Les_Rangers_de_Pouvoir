const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const url = 'mongodb://localhost:27017';
const dbName = 'calendrier';
const collectionName = 'reservations';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    console.log("Connexion réussie à la base de données");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Route pour ajouter une réservation à la base de données
    app.post('/reservations', (req, res) => {
        const reservation = req.body;
        collection.insertOne(reservation, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erreur lors de l\'ajout de la réservation' });
            }
            console.log("Réservation ajoutée à la base de données :", result.ops[0]);
            res.json({ message: 'Réservation ajoutée avec succès', reservation: result.ops[0] });
        });
    });
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

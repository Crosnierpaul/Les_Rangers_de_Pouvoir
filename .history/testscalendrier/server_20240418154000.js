const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path'); // Importer le module path

const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// URL de connexion à MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'calendrier';
const collectionName = 'reservations';

// Connexion à la base de données MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    console.log("Connexion réussie à la base de données");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Route pour ajouter une réservation à la base de données
    app.post('/reservations', (req, res) => {
        const reservation = req.body;
        collection.insertOne(reservation, (err, result) => {
            if (err) return console.error(err);
            console.log("Réservation ajoutée à la base de données :", result.ops[0]);
            res.send("Réservation ajoutée avec succès");
        });
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

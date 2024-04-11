// server.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/monSiteDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to database:', err));

app.use(express.json());
app.use('/auth', authRoutes);

// Ajouter une route pour la racine
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurer Express pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

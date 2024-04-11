// auth.js
const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Données reçues dans le corps de la requête :', { username, password }); // Ajoutez cette ligne pour afficher les données reçues
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    
    await newUser.save();
    console.log('Nouvel utilisateur enregistré :', newUser);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    res.status(400).send(error.message);
  }
});


module.exports = router;

const express = require('express');
const User = require('../models/user');

const router = express.Router();

//----------- Commande Register -----------//
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Données reçues dans le corps de la requête :', { email, password });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Un utilisateur avec cette adresse e-mail existe déjà.");
    }

    const newUser = new User({
      email: req.body.email,
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

//----------- Commande Login -----------//
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Données reçues dans le corps de la requête :', { email, password });
    const user = await User.findOne({ email, password });
    console.log(user)
    if (user) {
      res.status(200).send('Connexion réussie');
    } else {
      res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).send('Erreur lors de la connexion');
  }
});

module.exports = router;
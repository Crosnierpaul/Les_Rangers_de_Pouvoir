// connectionRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log('Attempting login with username:', username);

    try {
        const user = await User.findOne({ username });
        console.log('Found user:', user);

        if (user && bcrypt.compareSync(password, user.password)) {
            console.log('Login successful!');
            req.session.userId = user._id;
            res.redirect('/admin');
        } else {
            console.log('Invalid username or password');
            res.render('login', { error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.render('login', { error: 'An error occurred during login' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

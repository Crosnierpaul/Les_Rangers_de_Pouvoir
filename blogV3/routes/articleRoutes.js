// routes/articleRoutes.js

const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// GET all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new article
//----------- Commande Create Article -----------//
router.post('/Create', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    });

    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ... Other routes for updating, deleting articles, etc.

module.exports = router;

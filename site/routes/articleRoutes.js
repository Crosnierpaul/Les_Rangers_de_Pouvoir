const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Route pour récupérer tous les articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        res.status(500).send('Erreur du serveur');
    }
});

// Route pour ajouter un commentaire à un article
// routes/articles.js
router.post('/:articleId/comments', async (req, res) => {
    try {
        const { articleId } = req.params;
        const { username, text } = req.body;

        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).send('Article non trouvé');
        }

        article.comments.push({ username, text });
        await article.save();

        res.redirect(`/articles/#article-${articleId}`);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        res.status(500).send('Erreur du serveur');
    }
});


//----------- POST Commande Create Article -----------//
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

//----------- DELETE Commande Delete Article -----------//
router.delete('/Delete/:title', async (req, res) => {
    const articleTitle = req.params.title;

    try {
        // Supprimer l'article de la base de données en fonction de son titre
        const deletedArticle = await Article.findOneAndDelete({ title: articleTitle });

        if (!deletedArticle) {
            return res.status(404).json({ message: 'Aucun article trouvé avec ce titre.' });
        }

        res.json({ message: 'Article supprimé avec succès !' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//----------- GET Commande Get One Article ( by its title ) -----------//
router.get('/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const article = await Article.findOne({ title: title });
        if (!article) {
            return res.status(404).json({ message: 'Aucun article trouvé avec ce titre.' });
        }
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//----------- PUT Commande Put Article Updated -----------//
router.put('/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const article = await Article.findOne({ title: title });
        if (!article) {
            return res.status(404).json({ message: "Aucun article trouvé avec ce titre." });
        }

        article.content = req.body.content;
        article.image = req.body.image;

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

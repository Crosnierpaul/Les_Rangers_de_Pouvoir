// server.js

const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articleRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/articles', articleRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Supprimer un article en fonction de son titre
app.delete('/articles/Delete/:title', async (req, res) => {
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

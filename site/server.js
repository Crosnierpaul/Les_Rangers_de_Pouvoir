const express = require('express');
const mongoose = require('mongoose');
const semainesRoutes = require('./routes/semainesRoutes');
const articleRoutes = require('./routes/articleRoutes');
const reservationsRoutes = require('./routes/reservationsRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//----------- Connect to MongoDB -----------//
mongoose.connect('mongodb://localhost:27017/siteDB', { useNewUrlParser: true, useUnifiedTopology: true })
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

//----------- View engine setup -----------//
// Utilisez le chemin absolu pour spécifier le dossier "views"
app.set('views', path.join(__dirname, 'public', 'views')); 

// Définissez EJS comme moteur de vue
app.set('view engine', 'ejs');

//----------- Routes -----------//
app.use('/semaines', semainesRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/articles', articleRoutes);

app.get('/', (req, res) => {
    res.render('index'); // Rend le fichier "index.ejs" dans le dossier "views"
});

app.get('/blog', (req, res) => {
    res.render('blog'); // Rend le fichier "blog.ejs" dans le dossier "views"
});

app.get('/reservation', (req, res) => {
    res.render('reservation'); // Rend le fichier "reservation.ejs" dans le dossier "views"
});

app.get('/admin', (req, res) => {
    res.render('admin'); // Rend le fichier "admin.ejs" dans le dossier "views"
});

app.get('/adminBlog', (req, res) => {
    res.render('blogAdmin'); // Rend le fichier "blogAdmin.ejs" dans le dossier "views"
});

app.get('/adminReservation', (req, res) => {
    res.render('reservationAdmin'); // Rend le fichier "reservationAdmin.ejs" dans le dossier "views"
});

app.get('/entretien', (req, res) => {
    res.render('entretien');
});
const express = require('express');
const mongoose = require('mongoose');
const semainesRoutes = require('./routes/semainesRoutes');
const articleRoutes = require('./routes/articleRoutes');
const reservationsRoutes = require('./routes/reservationsRoutes');
const entretienRoutes = require('./routes/entretienRoutes');
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
app.set('views', path.join(__dirname, 'public', 'views')); 

app.set('view engine', 'ejs');

//----------- Routes -----------//
app.use('/semaines', semainesRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/articles', articleRoutes);
app.use('/entretiens', entretienRoutes);

app.get('/', (req, res) => {
    res.render('index'); 
});

app.get('/blog', (req, res) => {
    res.render('blog'); 
});

app.get('/reservation', (req, res) => {
    res.render('reservation'); 
});

app.get('/admin', (req, res) => {
    res.render('admin'); 
});

app.get('/adminBlog', (req, res) => {
    res.render('blogAdmin'); 
});

app.get('/adminReservation', (req, res) => {
    res.render('reservationAdmin'); 
});

app.get('/entretien', (req, res) => {
    res.render('entretien');
});

app.get('/adminEntretien', (req, res) => {
    res.render('entretienAdmin');
});

app.get('/adminAccueil', (req, res) => {
    res.render('accueilAdmin');
});
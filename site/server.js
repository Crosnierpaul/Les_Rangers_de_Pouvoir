// server.js

const express = require('express');

const mongoose = require('mongoose');

const semainesRoutes = require('./routes/semainesRoutes');

const articleRoutes = require('./routes/articleRoutes');

const reservationsRoutes = require('./routes/reservationsRoutes');

const entretienRoutes = require('./routes/entretienRoutes');

const connectionRoutes = require('./routes/connectionRoutes');

const path = require('path');

const session = require('express-session');

const MongoStore = require('connect-mongo');

const app = express();

const PORT = process.env.PORT || 3000;

const MONGODB_URL = 'mongodb+srv://Roll:1vt7jgcn@lamaisondugrandmas.gvocidr.mongodb.net/';

//----------- Connect to MongoDB -----------//

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        if (typeof(PhusionPassenger) !== 'undefined') {
            PhusionPassenger.configure({ autoInstall: false });
            app.listen('passenger', () => {
                console.log('Server is running with Phusion Passenger');
            });
        } else {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

//----------- Middleware -----------//

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));



// Session middleware

app.use(session({

    secret: 'your_secret_key',

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({ mongoUrl: 'mongodb+srv://Roll:1vt7jgcn@lamaisondugrandmas.gvocidr.mongodb.net/' })

}));



//----------- View engine setup -----------//

app.set('views', path.join(__dirname, 'public', 'views')); 

app.set('view engine', 'ejs');



// Middleware d'authentification

function isAuthenticated(req, res, next) {

    if (req.session.userId) {

        return next();

    } else {

        res.redirect('/login');

    }

}



//----------- Routes -----------//

app.use('/semaines', semainesRoutes);

app.use('/reservations', reservationsRoutes);

app.use('/articles', articleRoutes);

app.use('/entretiens', entretienRoutes);

app.use('/login', connectionRoutes);



app.get('/', (req, res) => {

    res.render('index'); 

});



app.get('/blog', (req, res) => {

    res.render('blog'); 

});



app.get('/reservation', (req, res) => {

    res.render('reservation'); 

});



app.get('/admin', isAuthenticated, (req, res) => {

    res.render('admin'); 

});



app.get('/adminBlog', isAuthenticated, (req, res) => {

    res.render('blogAdmin'); 

});



app.get('/adminReservation', isAuthenticated, (req, res) => {

    res.render('reservationAdmin'); 

});



app.get('/entretien', (req, res) => {

    res.render('entretien');

});



app.get('/adminEntretien', isAuthenticated, (req, res) => {

    res.render('entretienAdmin');

});



app.get('/adminAccueil', isAuthenticated, (req, res) => {

    res.render('accueilAdmin');

});



app.get('/login', (req, res) => {

    res.render('login');

});



app.get('/mentions', (req, res) => {

    res.render('mentions');

});

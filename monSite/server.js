const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

//---------- Initialisation MongoDB et Serveur ----------//
mongoose.connect('mongodb://localhost:27017/monSiteDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to database:', err));

//----------- Middlewares -----------//
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//------------- Routes -------------//
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', authRoutes);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
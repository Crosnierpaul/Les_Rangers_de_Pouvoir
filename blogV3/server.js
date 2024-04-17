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
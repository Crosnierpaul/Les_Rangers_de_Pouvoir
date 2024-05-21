// Article.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
});

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    comments: [commentSchema] // Ajout des commentaires
});

module.exports = mongoose.model('Article', articleSchema);

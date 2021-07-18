const mongoose = require('mongoose');
const secret = require('../secret')
mongoose.connect('mongodb+srv://'+secret.username+secret.password+'@cluster0.qqm3i.mongodb.net/Qoura?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });




// SCHEMA FOR A USER

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    questions: {
        type: Number,
        default: 0
    },
    answers: {
        type: Number,
        default: 0
    },
    Rating: {
        type: Number,
        default: 0
    },
    followed_by: [{
        type: String
    }]
})

const user = new mongoose.model("users", userschema);

module.exports = user;
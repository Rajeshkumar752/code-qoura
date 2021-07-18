const mongoose = require('mongoose');
const secret = require('../secret')
mongoose.connect('mongodb+srv://'+secret.username+secret.password+'@cluster0.qqm3i.mongodb.net/Qoura?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });



// SCHEMA FOR A ANSWER

const answerschema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    answerid: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    authormail: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    liked_by: [{
        type: String
    }]
})


const answer = new mongoose.model("answer", answerschema);

module.exports = answer;
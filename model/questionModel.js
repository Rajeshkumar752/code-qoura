const mongoose = require('mongoose');
const secret = require('../secret')
mongoose.connect('mongodb+srv://'+secret.username+secret.password+'@cluster0.qqm3i.mongodb.net/Qoura?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });



//SCHEMA FOR  A QUESTION

const questionschema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    questionid: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    authormail: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "other"
    }
})


const question = new mongoose.model("question", questionschema);


module.exports = question;
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const question = require('../model/questionModel')
const answer = require('../model/answerModel')
const user = require('../model/userModel')





//PAGE THAT INCLUDES ALL THE QUESTIONS

router.get('/explore', (req, res) => {
    question.find({}, (err, result) => {
        result.reverse();
        res.render('explore', {
            question: result
        })

    })

})





//GET REQUEST TO CREATE NEW QUESTION


router.get('/create', (req, res) => {

    if (!req.cookies.email) {
        res.redirect('/')
    }
    else {
        res.render('create_question')
    }
})



//POST REQUEST TO CREATE NEW QUESTION

router.post('/create', (req, res) => {

    const dt = new Date();
    const date = dt.getDate();
    const month = dt.getUTCMonth() + 1;
    const year = dt.getFullYear();


    user.findOne({ email: req.cookies.email }, (err, result) => {
        const newq = new question({
            content: req.body.question,
            date: "" + date + "/" + month + "/" + year,
            questionid: uuidv4(),
            author: result.name,
            authormail: req.cookies.email,
            tag: req.body.tag
        })

        result.questions = result.questions + 1;
        result.save();

        newq.save((err, result) => {
            res.redirect('/question/explore')
        });
    })
})




// TO HANDLE QUESTION FILTER

router.post('/filter', (req, res) => {
    question.find({ tag: req.body.tag }, (err, result) => {
        if (result != null) {
            result.reverse();
        }
        res.render('explore', {
            question: result
        })

    })
})



//  TO DELETE A QUESTION  

router.post('/delete', (req, res) => {
    const quid = req.body.qid;

    question.deleteOne({ questionid: quid }, (err, result) => {
        user.findOne({ email: req.cookies.email }, (err2, result2) => {
            result2.questions = result2.questions - 1;
            result2.save();
        })
        answer.deleteMany({ answerid: quid }, (er2, re2) => { });
        res.redirect('/user/profile')
    })
})


//EXPORTING THE ROUTE HANDLER

module.exports = router;
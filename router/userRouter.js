const express = require('express');
const router = express.Router();
const user = require('../model/userModel')
const question = require('../model/questionModel')
const answer = require('../model/answerModel')



// CREATE A NEW USER


router.post('/new', (req, res) => {

    const new_user = new user({
        name: req.body.username,
        number: req.body.mobile,
        email: req.body.mail,
        password: req.body.pass
    })

    new_user.save(() => {
        res.redirect('/')
    });
})



//LOGIN FOR EXISTING USER


router.post('/login', (req, res) => {
    const mailid = req.body.mail;
    const passid = req.body.pass;

    user.findOne({ email: mailid, password: passid }, (err, result) => {
        if (result == null) {
            res.redirect('/')
        }
        else {
            res.cookie('email', mailid);
            res.redirect('/home')
        }

    })
})




// USER SELF RELATED 

router.get('/profile', (req, res) => {
    if (!req.cookies.email) {
        res.redirect('/')
    }
    else {
        const user_id = req.cookies.email;
        if (user_id == null) {
            res.redirect('/')
        }
        question.find({ authormail: user_id }, (err, result) => {
            // console.log(result)
            result.reverse();
            user.findOne({ email: user_id }, (err, result2) => {
                res.render('user_profile', {
                    question: result,
                    user: result2.name,
                    followers: result2.followed_by.length,
                    questions: result2.questions,
                    answers: result2.answers,
                    rating: result2.Rating
                })
            })
        })
    }
})






//   OTHER USERS RELATED  (OTHER USER PROFILE)

router.post('/user_profile', (req, res) => {

    const user_id = req.body.authormail;

    var curr_user

    if (!req.cookies.email) {
        curr_user = ""
    }
    else {
        curr_user = req.cookies.email;
    }

    if (user_id == curr_user) {
        res.redirect('/user/profile')
    }
    else {
        question.find({ authormail: user_id }, (err, result) => {
            // console.log(result)
            result.reverse();
            user.findOne({ email: user_id }, (err, result2) => {
                res.render('other_user_profile', {
                    question: result,
                    user: result2.name,
                    followers: result2.followed_by.length,
                    questions: result2.questions,
                    answers: result2.answers,
                    rating: result2.Rating,
                    user: result2.name,
                    authormail: result2.email
                })
            })
        })
    }

})


//EXPORTING THE ROUTE HANDLER


module.exports = router;

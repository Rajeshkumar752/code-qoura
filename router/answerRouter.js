const express = require('express');
const router = express.Router();
const answer = require('../model/answerModel')
const question = require('../model/questionModel')
const user = require('../model/userModel')



// TO VIEW A ANSWERS OF A PARTICULAR QUESTION


router.get('/view/:id', (req, res) => {
    answer.find({ answerid: req.params.id }, (err, result) => {
        if (err||result==null) {
            res.send("404 ERROR  - not FOUND");
        }
        else {
            result.reverse();
            question.find({ questionid: req.params.id }, (err2, result2) => {

                if (err2) {
                    res.send("404 ERROR  - not FOUND");
                }
                else {
                    res.render('view_answers', {
                        question: result2[0].content,
                        answer: result,
                        questionid: req.params.id
                    })
                }
            })
        }
    })
})




// TO SUBMIT ANSWER OF A QUESTION 

router.post('/submit', (req, res) => {
    if (!req.cookies.email) {
        res.redirect('/')
    }
    else {
        user.findOne({ email: req.cookies.email }, (err, result) => {
            const newans = new answer({
                content: req.body.answer,
                author: result.name,
                answerid: req.body.quid,
                authormail: result.email
            })

            result.answers = result.answers + 1;
            result.save();

            newans.save((err, result) => {
                res.redirect('/answer/view/' + req.body.quid + '')
            });

        })
    }
})



// LIKE A QUESTION

router.post('/like', (req, res) => {

    if (!req.cookies.email) {
        res.redirect('/')
    }
    else {
        answer.findOne({ _id: req.body.id }, (err, result) => {

            const curr_user_id = req.cookies.email;

            if (result.authormail == curr_user_id) {
                res.redirect('/answer/view/' + result.answerid)
            }
            else {
                const index = result.liked_by.indexOf(curr_user_id);

                if (index > -1) {
                    result.liked_by.splice(index, 1);
                    result.likes = result.likes - 1;
                    user.findOne({ email: result.authormail }, (error, result2) => {
                        result2.Rating = result2.Rating - 1;
                        result2.save();
                    })
                }
                else {
                    user.findOne({ email: result.authormail }, (error, result2) => {
                        result2.Rating = result2.Rating + 1;
                        result2.save();
                    })
                    result.liked_by.push(curr_user_id)
                    result.likes = result.likes + 1;
                    if (result.likes < 0) result.likes = 0;
                }


                result.save((err, rr) => {
                    res.redirect('/answer/view/' + result.answerid)
                })

            }

        })
    }
})




//EXPORTING THE ROUTE HANDLER

module.exports = router;
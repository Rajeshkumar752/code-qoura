const express = require('express');
const router = express.Router();
const controller = require('../controller/answerController')




// TO VIEW A ANSWERS OF A PARTICULAR QUESTION

router.get('/view/:id',controller.view_answer )



// TO SUBMIT ANSWER OF A QUESTION 

router.post('/submit',controller.submit_answer )



// LIKE A QUESTION

router.post('/like',controller.like_answer )




//EXPORTING THE ROUTE HANDLER

module.exports = router;
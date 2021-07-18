const express = require('express');
const router = express.Router();
const controller = require('../controller/questionController')



//PAGE THAT INCLUDES ALL THE QUESTIONS

router.get('/explore',controller.explore)



//GET REQUEST TO CREATE NEW QUESTION

router.get('/create', controller.create_get)



//POST REQUEST TO CREATE NEW QUESTION

router.post('/create', controller.create_post)



// TO HANDLE QUESTION FILTER

router.post('/filter',controller.filter)



//  TO DELETE A QUESTION  

router.post('/delete',controller.Delete )


//EXPORTING THE ROUTE HANDLER

module.exports = router;
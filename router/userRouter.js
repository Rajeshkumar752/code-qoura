const express = require('express');
const router = express.Router();
const controller = require('../controller/userController')


// CREATE A NEW USER

router.post('/new',controller.new_user )



//LOGIN FOR EXISTING USER

router.post('/login',controller.user_login )



// USER SELF RELATED 

router.get('/profile',controller.profile )



//   OTHER USERS RELATED  (OTHER USER PROFILE)

router.post('/user_profile',controller.user_profile)



//EXPORTING THE ROUTE HANDLER

module.exports = router;

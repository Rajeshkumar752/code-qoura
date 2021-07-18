const express = require("express");
const cookieParser = require('cookie-parser');




// IMPORTING ROUTE HANDLERS

const userRouter = require('./router/userRouter');
const questionRouter = require('./router/questionRouter')
const answerRouter = require('./router/answerRouter')

const app = express();




//SETTING BASIC MIDDLEWARE

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));





//BASIC AND HOME ROUTES

app.get('/home', (req, res) => {
    res.render('home', {})
})

app.get('/', (req, res) => {
    res.render('login')
})


app.get('/signup', (req, res) => {
    res.render('signup')
})





//   USER RELATD  ROUTES

app.use('/user', userRouter)





// QUESTION RELATED ROUTES

app.use('/question', questionRouter);




//   ANSWER RELATED ROUTE

app.use('/answer',answerRouter);



//LISTENING...........
app.listen(3000);
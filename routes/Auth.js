const express=require('express');
const authController=require('../controllers/Auth');
// console.log(authController);

const routes=express.Router();

routes.post('/login', authController.login);
routes.post('/signup', authController.signUp);

// routes.post('/register', );


module.exports=routes;

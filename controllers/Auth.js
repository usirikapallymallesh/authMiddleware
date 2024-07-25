const userModel = require('../models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const jwtSecretKey = process.env.MY_JWT_KEY;
// console.log(jwtSecretKey);

const signUp=async (req, res, next) => {
    // console.log(req.body);
    //to validation check points
    const salt =bcrypt.genSaltSync(10);
    console.log(salt);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(hashedPassword);


    const newUser = await new userModel({...req.body,password:hashedPassword});
    const newlyInsertedData=await newUser.save();
    console.log(newlyInsertedData);
    res.status(200).json({
    success: true,
    message: 'User registered successfully',
    // user: newlyInsertedData,
  });
}
const login=async (req, res, next)=>{
    console.log(req.body);
    const user = await userModel.findOne({email: req.body.email});
    if(!user){
        return res.status(404).json({success: false, message: 'User not found'});
    }

    const isPasswordValid =bcrypt.compareSync(req.body.password,user.password);
    console.log(isPasswordValid);

    const tokenExpires=Math.ceil(new Date().getTime()/1000)+3600;
    // non sensitive information should be kept in pay load.
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
        exp:tokenExpires,
    };
    // Sign token
     const token=jwt.sign (payload,jwtSecretKey);
     console.log(payload);

    if (isPasswordValid){
        //generating the jwt token.
        return res.status(200).json({
            authenticated: true,
            message: 'User authenticated successfully',
            token
        });
    }
    res.status(401).json({success: false, message: ' incorrect user name and password'});

}
   
const authController={
    signUp,
    login,
}
module.exports = authController;
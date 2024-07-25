const jwt =require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../models/Auth');
const validUser=async (req,res,next)=>{
    // validate user and pass here
    // if valid, next() else res.status(401).json({message: 'Unauthorized'})

    
    /**************************************************
     * 1.token should be present.
     * 2.secret key validation 
     * 3.token expiration time
     * 4.validate the user id if is present in database or not.
     * 5.validate the time of login.
     **************************************************/
    //1 = validate
    const headers=req.headers;
    if (!headers.authorization) {
       res.status(401).json({
        message: 'Authorization token is required',
       });
    }
    //2 to check the authorization key validity
    try {
        const decoded = jwt.verify(headers.authorization, process.env.MY_JWT_KEY);
        // console.log(decoded);
    } catch (err) {
        // console.error('Invalid token');
        res.status(403).json({message: 'Invalid token'});
    }

    // 3 token expiration
    const tokenData=jwt.decode(headers.authorization );
    const tokenExp=tokenData.exp;
    const now =Math.ceil(new Date().getTime()/1000) ;
    if(tokenExp<now){
        return res.status(401).json({message: 'Token expired'});
    };

    //5 validation of user id.
    const userId =tokenData.id;
    // check if user exists in database.
   const user=await userModel.findById(userId);
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    req.user=user;
    next();
}
module.exports =validUser;
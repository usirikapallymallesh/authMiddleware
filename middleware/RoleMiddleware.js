const roleMiddlware= (role)=>async(req,res,next)=> {
    const user =req.user;//user role from database
    // console.log(role);
    // console.log(user);
    if(role!==user.role){
        return res.status(403).json({message: 'Unauthorized access'});
    }
    next();

};

module.exports=roleMiddlware;
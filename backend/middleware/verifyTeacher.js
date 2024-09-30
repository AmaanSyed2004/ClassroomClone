const jwt= require('jsonwebtoken');
require('dotenv').config();
const checkTeacher=(req,res,next)=>{
    const token= req.cookies.token;
    if(!token) return res.status(401).json({Message:"Unauthorized"});
    jwt.verify(token, process.env.ACCESS_SECRET, (err,user)=>{
        if(err) return res.status(403).json({message:"Forbidden"});
        if(!(user.role==="teacher")) return res.status(403).json({message:"Inavlid role, studnents cannot create a course."});
        req.user=user;
        return next();
    })
}
module.exports=checkTeacher;
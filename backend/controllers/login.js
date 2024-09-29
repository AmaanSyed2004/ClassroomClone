const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/token");
const login= async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"Email and password are requried"});
    }
    try{
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Email Not Found"});
        }
        const isMatch= await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(403).json({message:"Invalid Password"});
        }
        //user is verified now, send a cookie
        const token= generateToken(user);
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:true,
            maxAge: 3600000,
        });
        res.status(200).json({message:"Logged in successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}
module.exports=login;
const User = require('../models/User');
const verify= async(req,res)=>{
    try{
        console.log(req.user)
        const user = await User.findById( req.user.id).select('-password');
        if (!user) return res.status(404).json({message: "User Not found"});
        return res.json({isAuth: true, user});
      }
      catch(error){
        return res.sendStatus(500);
      }
    
}
module.exports= verify;
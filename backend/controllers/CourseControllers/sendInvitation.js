const Invitation = require("../../models/Invitation");
const User = require("../../models/User");
const sendMail = require("../../utils/sendMail");

const sendInvitation= async (req, res) => {
    const {email, courseID}=req.body;
    if(!email || !courseID){
        return res.status(400).json({message:"Email and course ID are required."});
    }
    try{
        const user= await User.findOne({email});
        if(!user) res.status(404).json({message:"User not found."});
        const course= await Course.findOne({courseID});
        if(!course) res.status(404).json({message:"Course not found."});
        
        const invite= new Invitation({
            email,
            courseID,
            sender:req.user.id
        });
        await invite.save();
        await sendMail({email, courseID, title:course.title, name:req.user.name})
        res.status(200).json({message:"Invitation sent successfully!"});
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server error."});
    }
}
module.exports=sendInvitation;
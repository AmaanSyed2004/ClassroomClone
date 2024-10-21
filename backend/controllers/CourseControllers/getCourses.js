const User=require('../../models/User');
const Course=require('../../models/Course');
const getCourses= async (req,res)=>{
    try{
        const userId=req.user.id;
        const courses=await Course.find({students:userId}).populate("createdBy","name email").populate({
            path: 'assignments', // Populating assignments
            select: 'title description dueDate', // Specify which fields to populate from Assignment
        });
        res.status(200).json({courses});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error."});
    }
}
module.exports=getCourses;
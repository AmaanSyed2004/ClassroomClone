const Course = require("../../models/Course");
const leaveCourse= async(req,res)=>{
    const {courseID}=req.body;
    if(!courseID){
        return res.status(400).json({message:"Course ID is required."});
    }
    try{
        const course=await Course.findOne({courseID});
        if(!course){
            return res.status(404).json({message:"Course not found."});
        }
        const index=course.students.indexOf(req.user.id);
        if(index===-1){
            return res.status(400).json({message:"You are not enrolled in this course."});
        }
        course.students.splice(index,1);
        await course.save();
        res.status(200).json({message:"Left course successfully."});        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error."});
    }
}

module.exports=leaveCourse;
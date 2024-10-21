const Course= require("../../models/Course");

const getSubmissions= (async (req,res)=>{
    try{
        const course= await Course.findOne({courseID:req.params.id});
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        const assignment= course.assignments.id(req.params.aid);
        if(!assignment){
            return res.status(404).json({message:"Assignment not found"});
        }
        res.status(200).json({submissions:assignment.submissions});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
});

module.exports=getSubmissions;
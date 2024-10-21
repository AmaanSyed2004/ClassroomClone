const Course= require('../../models/Course')
const assignments = require('../../models/Assignments')
const getAssignments = async (req, res) => {
    //get all the assignments under a course
    try{
        const course= Course.findOne({courseID:req.params.id});
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        const assignments= course.assignments;
        res.status(200).json(assignments)
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}
module.exports=getAssignments
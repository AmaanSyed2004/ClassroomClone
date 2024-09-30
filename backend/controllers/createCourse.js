const Course= require("../models/Course");
const User= require("../models/User");
const createCourse= async(req,res)=>{
    const{title,description}=req.body;
    if(!title || !description){
        return res.status(400).json({message:"Title and description are required."});
    }
    try{
        const alreadyExists= await Course.findOne({title,createdBy:req.user.id});
        if(alreadyExists){
            return res.status(400).json({message:"Course with this title already exists."});
        }
        const course= new Course({
            title,
            description,
            createdBy:req.user.id,
        });
        await course.save();
        const createdBy= await User.findById(req.user.id);
        createdBy.classesManaged.push(course._id);
        await createdBy.save();
        res.status(201).json({message:"Course created successfully."});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error."});
    }
}
module.exports=createCourse;
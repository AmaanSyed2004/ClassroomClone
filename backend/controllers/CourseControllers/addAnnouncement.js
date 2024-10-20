const Course=require('../../models/Course');
//add an announcement
const addAnnouncement=async(req,res)=>{
    console.log("addAnnouncement");
    try{
        const course=await Course.findOne({courseID:req.params.id});
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        const{announcement}=req.body;
        if(!announcement){
            return res.status(400).json({message:"Please enter an announcement"});
        }
        console.log(course.announcements)
        course.announcements.push(announcement);
        await course.save();
        res.status(200).json({message:"Announcement added successfully!"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }

}
module.exports=addAnnouncement;
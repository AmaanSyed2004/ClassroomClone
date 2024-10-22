const Submission= require('../../models/Submissions')

const addSubmission= async(req,res)=>{
    const {id} = req.params; //the id of the ASSIGNMENT
    console.log(id)
    const {comment}= req.body;
    const file= req.file;
    try{
        const submission = new Submission({
            assignmentID:id,
            studentID:req.user.id,
            marks:0,
            files: file? [file.filename]: [],
            comments: comment? [comment] : []
        })
        await submission.save();
        res.status(201).json({message:"Submission is successfull!"})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
}

module.exports= addSubmission
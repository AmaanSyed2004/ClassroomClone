const Submission= require('../../models/Submissions')
const getSubmissions= async (req,res)=>{
    try {
        const submissions = await Submission.find().populate("assignmentID").populate("studentID");
        console.log(submissions);
        res.status(200).json(submissions);
      } catch (error) {
        res.status(500).json({ message: "Error fetching submissions", error });
      }
};

module.exports=getSubmissions;
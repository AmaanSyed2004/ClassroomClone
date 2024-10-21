const Course = require("../../models/Course");
async function getCourse(req, res) {
  // Get the courseID from the request
  console.log("here")
  const { id } = req.params;
  // Find the course in the database
    try {
        const course = await Course.findOne({ courseID:id }).populate("createdBy", "name").populate('assignments');
        // If the course is not found, return an error
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }
        // If the course is found, return the course
        res.status(200).json({ course });

    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
    }
}
module.exports = getCourse;
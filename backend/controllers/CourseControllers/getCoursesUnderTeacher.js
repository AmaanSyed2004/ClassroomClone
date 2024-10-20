const Course = require("../../models/Course");
async function getCoursesUnderTeacher(req, res) {
  // Get the teacherID from the request
  const { id } = req.user;
  try {
    const courses = await Course.find({ createdBy: id }).populate("students");
    // If the courses are not found, return an error
    if (!courses) {
      return res.status(404).json({ message: "Courses not found." });
    }
    // If the courses are found, return the courses
    res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
}
module.exports = getCoursesUnderTeacher;
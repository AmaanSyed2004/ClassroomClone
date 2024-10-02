const Course = require("../../models/Course");

const joinCourse = async (req, res) => {
  const { courseID } = req.body;
  if (!courseID) {
    return res.status(400).json({ message: "Course ID is required." });
  }
  try {
    const course = await Course.findOne({ courseID });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    course.students.push(req.user.id);
    await course.save();
    res.status(200).json({ message: "Joined course successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = joinCourse;

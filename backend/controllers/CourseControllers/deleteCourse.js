const Course = require("../../models/Course");
const bcryptjs = require("bcryptjs");
const deleteCourse = async (req, res) => {
  const { courseID, password } = req.body;
  if (!courseID) {
    return res.status(400).json({ message: "Course ID is required." });
  }
  try {
    const course = await Course.findOne({ courseID });
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    course.populate("createdBy");
    const isMatch = await bcryptjs.compare(password, course.createdBy.password);
    if (!isMatch) {
      return res.status(403).json({
        message:
          "Invalid password, you are not authorized to delete this course.",
      });
    }
    await Course.deleteOne({ courseID });
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
module.exports = deleteCourse;

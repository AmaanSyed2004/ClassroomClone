const express = require("express");
const createCourse = require("../controllers/CourseControllers/createCourse");
const checkTeacher = require("../middleware/verifyTeacher");
const checkStudent = require("../middleware/verifyStudent");
const joinCourse = require("../controllers/CourseControllers/joinCourse");
const deleteCourse = require("../controllers/CourseControllers/deleteCourse");
const sendInvitation = require("../controllers/CourseControllers/sendInvitation");
const getCourses = require("../controllers/CourseControllers/getCourses");

const router = express.Router();

router.post("/create", checkTeacher, createCourse);
router.post("/join", checkStudent, joinCourse);
router.post("/delete", checkTeacher, deleteCourse);
router.post("/sendInvite", checkTeacher, sendInvitation);
router.get("/get",checkStudent,getCourses);
module.exports = router;

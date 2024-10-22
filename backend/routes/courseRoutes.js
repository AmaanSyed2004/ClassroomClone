const express = require("express");
const createCourse = require("../controllers/CourseControllers/createCourse");
const checkTeacher = require("../middleware/verifyTeacher");
const checkStudent = require("../middleware/verifyStudent");
const joinCourse = require("../controllers/CourseControllers/joinCourse");
const deleteCourse = require("../controllers/CourseControllers/deleteCourse");
const sendInvitation = require("../controllers/CourseControllers/sendInvitation");
const getCourses = require("../controllers/CourseControllers/getCourses");
const getCourse = require("../controllers/CourseControllers/getCourse");
const getCoursesUnderTeacher = require("../controllers/CourseControllers/getCoursesUnderTeacher");
const checkStudentOrTeacher = require("../middleware/checkTeacherOrStudent");
const addAnnouncement = require("../controllers/CourseControllers/addAnnouncement");
const getAssignments = require("../controllers/assignmentControllers/getAssignments");
const createAssignment = require("../controllers/assignmentControllers/createAssignment");
const upload = require("../middleware/fileUpload");
const addSubmission = require("../controllers/submissionControllers/addSubmission");
const getSubmissions = require("../controllers/submissionControllers/getSubmissions");
const router = express.Router();

router.post("/create", checkTeacher, createCourse);
router.post("/join", checkStudent, joinCourse);
router.post("/delete", checkTeacher, deleteCourse);
router.post("/sendInvite", checkTeacher, sendInvitation);
router.get("/get", checkStudent,getCourses);
router.get("/getUnderTeacher", checkTeacher, getCoursesUnderTeacher);
router.get('/get/:id',checkStudentOrTeacher ,getCourse);
router.post('/addAnnouncement/:id', checkTeacher, addAnnouncement);
router.get('/getAssignments',checkStudentOrTeacher, getAssignments);
router.post('/createAssignment', checkTeacher, createAssignment);   
router.post('/addSubmission/:id', checkStudent, upload.single("file"), addSubmission);
router.get("/submissions",checkTeacher, getSubmissions)

module.exports = router;

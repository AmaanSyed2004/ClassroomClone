const express = require("express");
const createCourse = require("../controllers/createCourse");
const checkTeacher = require("../middleware/verifyTeacher");

const router = express.Router();

router.post("/create", checkTeacher,createCourse);
module.exports = router;

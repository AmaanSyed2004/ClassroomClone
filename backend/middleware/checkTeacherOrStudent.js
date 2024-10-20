const jwt = require("jsonwebtoken");
const checkStudentOrTeacher = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ Message: "Unauthorized" });
  jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: "Forbidden" });
    }
    if (user.role !== "student" && user.role !== "teacher") return res.status(403).json({ message: "Forbidden hehe" });
    req.user = user;
    return next();
  });
};

module.exports = checkStudentOrTeacher;

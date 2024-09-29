const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_SECRET;
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    secret,
    { expiresIn: "1h" }
  );
};
module.exports= generateToken;

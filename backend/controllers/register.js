const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/token");
const saltRounds = 10; //saltrounds for hashing password using bcryptjs
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if(!name || !email || !password || !role){
    return res.status(400).json({message:"All fields are required"});
  }
  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    const token= generateToken(user);
    res.cookie("token",token,{
        sameSite:true,
        maxAge: 3600000,
    });
    res
      .status(201)
      .json({ message: `${role} ${name} registered successfully!`, role: role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = register;

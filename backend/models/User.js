const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: true,
  },
  profilePicture: String,
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});
const User=mongoose.model("User",UserSchema);
module.exports=User;
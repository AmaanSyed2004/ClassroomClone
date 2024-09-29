const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ClassroomDB");
    console.log(
      "Connected to the database at mongodb://localhost:27017/ClassroomDB"
    );
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
  }
};
module.exports = connectToDB;

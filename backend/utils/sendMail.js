const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = async ({ email, courseID, title }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amaansbackup@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: "amaansbackup@gmail.com",
      to: email,
      subject: "Hey There! You are invited to join a classroom!",
      text: `Hey there! You have been invited to join ${title}. Please use this code: ${courseID} `,
    };

    // the function implicitly exectures the inner function to send the mail to the user as per the give email address
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error; // explicitly throw an error which is being catched further down the fucntion call
      }
      console.log("Invitation has been sent");
    });
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = sendMail;

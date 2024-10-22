const express = require("express");
const connectToDB = require("./config/connectToDB");
const allowCors = require("./middleware/cors");
const cookieParser = require("cookie-parser");
const path= require("path")
require("dotenv").config();
const app = express();
const port = 3000;
connectToDB();
app.use(express.json());
app.use(allowCors);
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/sign/", require("./routes/signInRoutes"));
app.use("/course/", require("./routes/courseRoutes"));
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

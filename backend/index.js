const express = require("express");
const connectToDB = require("./config/connectToDB");
const allowCors = require("./middleware/cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const app = express();
const port = 3000;
connectToDB();
app.use(express.json());
app.use(allowCors);
app.use(cookieParser());

app.use("/", require("./routes/routes"));
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

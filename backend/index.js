const express = require("express");
const connectToDB = require("./config/connectToDB");
const app = express();
const port = 3000;
connectToDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

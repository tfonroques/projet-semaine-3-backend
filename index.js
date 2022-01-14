const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
// const courses = require("./routes/courses");
// const home = require("./routes/home");
// const students = require("./routes/students");
const users = require("./routes/users");
const auth = require("./routes/auth");
const test = require("./routes/test");
const articles = require("./routes/articles");
const app = express();
var cors = require("cors");

app.use(cors());

mongoose
  .connect("mongodb://localhost/helloproject")
  .then(() => console.log("connect to database"))
  .catch(() => console.log("Something went wrong"));

app.use(express.json());

// app.use("/api/courses", courses);
// app.use("/", home);
// app.use("/api/students", students);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/test", test);
app.use("/api/articles", articles);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

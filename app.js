const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const ejs = require("ejs");
const db = require("./utils/db");


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//? importing routes
const postStudentProfile = require("./routes/studentProfile");
const signin = require("./routes/signin");
const signup = require("./routes/signup");

//? using the routes
app.use(postStudentProfile);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up on port : " + process.env.PORT || 3000);
  });
  
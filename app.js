const express = require("express");
// const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const ejs = require("ejs");
const db = require("./utils/db");
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


//? importing routes
const postStudentProfile = require("./routes/studentProfile");
const signin = require("./routes/signin");
const signup = require("./routes/signup");
const postCompanyProfile = require("./routes/companyProfile");
const postExpertProfile = require("./routes/expertProfile");
const postQuery = require("./routes/query");
const updateStudentProfile = require("./routes/updateStudentProfile");
const updateCompanyProfile = require("./routes/updateCompanyProfile");
const updateExpertProfile = require("./routes/updateExpertProfile");
const deleteStudentProfile = require("./routes/deleteStudentProfile");
const deleteExpertProfile = require("./routes/deleteExpertProfile");
const deleteCompanyProfile = require("./routes/deleteCompanyProfile");
const postMarriageDetails = require("./routes/postMarriageDetails");

//? using the routes
app.use(postStudentProfile);
app.use(postCompanyProfile);
app.use(postExpertProfile);
app.use(postQuery);
app.use(signin);
app.use(signup);
app.use(updateStudentProfile);
app.use(updateCompanyProfile);
app.use(updateExpertProfile);
app.use(deleteStudentProfile);
app.use(deleteCompanyProfile);
app.use(deleteExpertProfile);
app.use(postMarriageDetails);


app.get('/studentProfileForm',  async (req, res) => {
  res.render('studentForm');
});

app.get('/postCompanyForm', async (req, res) => {
res.render('companyForm');
})

app.get('/marriageForm', async (req, res) => {
  res.render('marriageForm');
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up on port : " + process.env.PORT || 3000);
  });
  
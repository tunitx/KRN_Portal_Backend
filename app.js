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
const postStudentProfile = require("./routes/krn-portal/studentProfile");
const signin = require("./routes/krn-portal/signin");
const signup = require("./routes/krn-portal/signup");
const postCompanyProfile = require("./routes/krn-portal/companyProfile");
const postExpertProfile = require("./routes/krn-portal/expertProfile");
const postQuery = require("./routes/krn-portal/query");
const updateStudentProfile = require("./routes/krn-portal/updateStudentProfile");
const updateCompanyProfile = require("./routes/krn-portal/updateCompanyProfile");
const updateExpertProfile = require("./routes/krn-portal/updateExpertProfile");
const deleteStudentProfile = require("./routes/krn-portal/deleteStudentProfile");
const deleteExpertProfile = require("./routes/krn-portal/deleteExpertProfile");
const deleteCompanyProfile = require("./routes/krn-portal/deleteCompanyProfile");
const postMarriageDetails = require("./routes/marriage-portal/postMarriageDetails");
const getMarriageDetails = require("./routes/marriage-portal/getBioDataByFilters");
const updateMarriageDetails = require("./routes/marriage-portal/updateMarriageProfile");

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
app.use(getMarriageDetails);
app.use(updateMarriageDetails);


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
  
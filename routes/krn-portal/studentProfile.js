const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const StudentProfile = require("../models/StudentSchema");
const User = require("../models/UserAuthSchema");

const uploadS3 = require("../utils/awsConfig");

// ?? POST /postStudentProfile

router.post(
  "/postStudentProfile", verifyToken,
  uploadS3.fields([
    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),

  async (req, res) => {
    if (req.files["photo"][0].size > 1024 * 1024 * 5) {
      return res.status(400).json({
        message: 'photo size too large',
      });
    }
    if (req.files["resume"][0].size > 1024 * 1024 * 10) {
      return res.status(400).json({
        message: 'resume size too large',
      });
    }

    try {
      const {
        name,
        dob,
        email,
        contactNumber,
        address,
        domain,
        yearsOfExperience,
      } = req.body;

      //! for checking the validity of the phone number and email.
      let errorMessage = "";
      const phoneNumberPattern = /^\d{10}$/;
      const emailPattern = /^\S+@\S+\.\S+$/;

      if (!phoneNumberPattern.test(contactNumber)) {
        errorMessage += "invalid phone number";
      }

      if (!emailPattern.test(email)) {
        errorMessage += "invalid email";
      }
      if (errorMessage) {
        return res.status(400).json({
          message: errorMessage,
        });
      }
      const photoUrl = req.files["photo"][0].location;
      const resumeUrl = req.files["resume"][0].location;

      const studentProfile = new StudentProfile({
        name,
        dob,
        email,
        contactNumber,
        address,
        photoUrl,
        resumeUrl,
        domain,
        yearsOfExperience,
        resume: resumeUrl,
        photo: photoUrl,
        date_of_log: new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}),
        

      });

      await studentProfile.save();
      const user = await User.findOne({email : req.user.email });
      user.student = studentProfile._id;
      user.save();
      res.status(201).json({
        message: "Student profile created successfully",
        studentProfile
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

module.exports = router;


const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const StudentProfile = require("../models/StudentSchema");

const uploadS3 = require("../utils/awsConfig");

// ?? POST /postStudentProfile

router.post(
  "/postStudentProfile",
  uploadS3.fields([
    { name: "photo", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    if (req.files["photo"][0].size > 1024 * 1024 * 5) {
      return next(
        new Error("File too large. Maximum file size for images is 5MB.")
      );
    }
    if (req.files["resume"][0].size > 1024 * 1024 * 10) {
      return next(
        new Error("File too large. Maximum file size for PDFs is 10MB.")
      );
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
      const photoUrl = req.files["photo"][0].location;
      const resumeUrl = req.files["resume"][0].location;

      const studentProfile =  new StudentProfile({
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
      });
      
      await studentProfile.save();
      res.status(201).json({
        message: "Student profile created successfully",
        studentProfile,
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

const express = require("express");
const router = express.Router();
const verifyToken = require("../../utils/verifyToken");
const CompanyProfile = require("../../models/CompanySchema");

const uploadS3 = require("../../utils/awsConfig");
 const User = require("../../models/UserAuthSchema");

router.post(
  "/postCompanyProfile",
  uploadS3.single("file"), verifyToken,
  async (req, res) => {
    try {
      const { name, email, contactNumber } = req.body;
      const file = req.file;

      if (file.mimetype !== "application/pdf" || file.size > 5000000) {
        return res
          .status(400)
          .json({ message: "File must be a pdf and have size less than 5MB" });
      }
      const newCompanyProfile = new CompanyProfile({
        name,
        email,
        contactNumber,
        file: file.location,
        date_of_log: new Date(),
      });

      await newCompanyProfile.save();

      const user = await User.findOne({email : req.user.email });
      user.company = newCompanyProfile._id;
      user.save();

      res
        .status(200)
        .json({
          message: "Company profile saved successfully",
          newCompanyProfile,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;

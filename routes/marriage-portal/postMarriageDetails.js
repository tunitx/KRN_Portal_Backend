//? Import necessary modules and models
const express = require("express");
const router = express.Router();
const MarriageProfile = require("../../models/marriageSchema");
const uploadS3 = require("../../utils/awsConfig");

//? Create a post route at /postMarriageDetails
router.post(
  "/postMarriageDetails",
  uploadS3.fields([{ name: "file", maxCount: 1 },
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]),
  async (req, res) => {
    console.log(req.body)
    try {
      //? Extract the details from the request body
      // if (req.files["photo"][0].size > 1024 * 1024 * 5) {
      //   return res.status(400).json({
      //     message: "photo size too large",
      //   });
      // }
      const {
        gender,
        fullName,
        caste,
        subcaste,
        gotra,
        dob,
        manglik,
        placeOfBirth,
        currentAddress,
        location,
        country,
        state,
        city,
        heightFeet,
        complexion,
        education,
        occupation,
        incomeBracket,
        maritalStatus,
        pwd,
        phoneNumber1,
        phoneNumber2,
        email
      } = req.body;

      //? Calculate age from DOB
      const age = Math.floor((new Date() - new Date(dob)) / 31557600000);
      console.log(heightFeet);
      const heightInCms = Math.round(Number(heightFeet) * 30.48);
      console.log(heightInCms);
      const fileUrl = req.files["file"][0].location;
      const image1Url = req.files["image1"][0].location;
      const image2Url = req.files["image2"][0].location;
      const image3Url = req.files["image3"][0].location
      console.log(fileUrl, image1Url, image2Url, image3Url)
      

      //? Create a new MarriageProfile object with the extracted details
      const newMarriageProfile = new MarriageProfile({
        gender,
        fullName,
        caste,
        subcaste,
        gotra,
        dob,
        age,
        manglik,
        placeOfBirth,
        currentAddress,
        countryType: location,
        country,
        state,
        city,
        heightInCms: heightInCms,
        complexion,
        education,
        occupation,
        incomeBracket,
        maritalStatus,
        pwd,
        file : fileUrl,
        image1 : image1Url,
        image2 : image2Url,
        image3 : image3Url,
        phoneNumber1,
        phoneNumber2,
        email,
        timestamp: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      });
console.log(newMarriageProfile);
      //? Save the new MarriageProfile object to the database
      await newMarriageProfile.save();

      //? Send a success response
      res
        .status(200)
        .json({
          message: "Marriage details saved successfully",
          newMarriageProfile,
        });
    } catch (error) {
      //? Send an error response
      console.log(error);
      res.status(500).json({ message: "Error saving marriage details", error });
    }
  }
);

module.exports = router;

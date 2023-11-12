
//? Import necessary modules and models
const express = require('express');
const router = express.Router();
const MarriageProfile = require('../models/marriageSchema');
const uploadS3 = require("../utils/awsConfig");

//? Create a post route at /postMarriageDetails
router.post('/postMarriageDetails',  uploadS3.fields([
    { name: "photo", maxCount: 1 }
  ]), async (req, res) => {
  try {
    //? Extract the details from the request body
    if (req.files["photo"][0].size > 1024 * 1024 * 5) {
        return res.status(400).json({
          message: 'photo size too large',
        });
      }
    const { gender, fullName, caste, subcaste, gotra, dob, manglik, placeOfBirth, currentAddress, nativePlace, heightInFeet, complexion, education, incomeBracket, contactDetails, confirmationAndConsent } = req.body;

    //? Calculate age from DOB
    const age = Math.floor((new Date() - new Date(dob)) / 31557600000);
    const photoUrl = req.files["photo"][0].location;

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
      photo : photoUrl,
      placeOfBirth,
      currentAddress,
      nativePlace,
      heightInFeet,
      complexion,
      education,
      incomeBracket,
      contactDetails,
      confirmationAndConsent,
      timestamp : new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}),
    });

    //? Save the new MarriageProfile object to the database
    await newMarriageProfile.save();

    //? Send a success response
    res.status(200).json({ message: 'Marriage details saved successfully', newMarriageProfile });
  } catch (error) {
    //? Send an error response
    res.status(500).json({ message: 'Error saving marriage details', error });
  }
});

module.exports = router;

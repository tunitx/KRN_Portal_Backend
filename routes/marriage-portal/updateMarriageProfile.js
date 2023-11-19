const express = require("express");
const router = express.Router();
const uploadS3 = require("../../utils/awsConfig");

const Marriage = require("../../models/marriageSchema");
const User = require("../../models/UserAuthSchema");
const verifyToken = require("../../utils/verifyToken");

router.put(
  "/updateCompanyProfile",
  verifyToken,
  uploadS3.fields([{ name: "file", maxCount: 1 },
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  ]),
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'gender',
      'fullName',
      'caste',
      'subcaste',
      'gotra',
      'dob',
      'manglik',
      'placeOfBirth',
      'currentAddress',
      'location',
      'country',
      'state',
      'city',
      'heightFeet',
      'complexion',
      'education',
      'occupation',
      'incomeBracket',
      'maritalStatus',
      'pwd',
      'phoneNumber1',
      'phoneNumber2',
      'email'
    ];

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    console.log(req.body);
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
      const user = await User.findOne({ email: req.user.email });
      console.log(user);
      const marriage = await Marriage.findById(user.marriage);
      console.log(marriage);

      updates.forEach((update) => (marriage[update] = req.body[update]));

      if (req.files.photo) {
        marriage.photo = req.files.photo[0].location;
      }
      marriage.timestamp = new Date();

      await marriage.save();
      res.send(marriage);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;

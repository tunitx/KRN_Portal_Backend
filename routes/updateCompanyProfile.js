
const express = require('express');
const router = express.Router();
const uploadS3 = require('../utils/awsConfig');

const Company= require('../models/CompanySchema');
const User = require('../models/UserAuthSchema');
const verifyToken = require('../utils/verifyToken');

router.put('/updateCompanyProfile', verifyToken, uploadS3.fields([
//   { name: 'photo', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name',  'email', 'contactNumber'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    console.log(req.body);
// console.log
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findOne({email : req.user.email});
    console.log(user)
    const company = await Company.findById(user.company);
    console.log(company);

    updates.forEach((update) => company[update] = req.body[update]);


    if (req.files.file) {
      company.file = req.files.file[0].location;
    }
    company.date_of_log = new Date();

    await company.save();
    res.send(company);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
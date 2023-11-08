
const express = require('express');
const router = express.Router();
const uploadS3 = require('../utils/awsConfig');

const Expert= require('../models/ExpertSchema');
const User = require('../models/UserAuthSchema');
const verifyToken = require('../utils/verifyToken');

router.put('/updateExpertProfile', verifyToken, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name',  'email', 'contactNumber', 'domain', 'subDomain'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    console.log(req.body);
// console.log
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findOne({email : req.user.email});
    console.log(user)
    const expert = await Expert.findById(user.expert);
    console.log(expert);

    updates.forEach((update) => expert[update] = req.body[update]);


    
    expert.date_of_log = new Date();

    await expert.save();
    res.send(expert);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
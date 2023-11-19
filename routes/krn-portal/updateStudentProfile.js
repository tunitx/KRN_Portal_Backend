
const express = require('express');
const router = express.Router();
const uploadS3 = require('../../utils/awsConfig');

const Student = require('../../models/StudentSchema');
const User = require('../../models/UserAuthSchema');
const verifyToken = require('../../utils/verifyToken');

router.put('/updateStudentProfile', verifyToken, uploadS3.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'dob', 'email', 'contactNumber', 'address', 'domain', 'yearsOfExperience'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
console.log(req.body);
// console.log
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findOne({email : req.user.email});
    console.log(user)
    const student = await Student.findById(user.student);

    updates.forEach((update) => student[update] = req.body[update]);

    if (req.files.photo) {
      student.photo = req.files.photo[0].location;
    }

    if (req.files.resume) {
      student.resume = req.files.resume[0].location;
    }
    student.date_of_log = new Date();

    await student.save();
    res.send(student);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
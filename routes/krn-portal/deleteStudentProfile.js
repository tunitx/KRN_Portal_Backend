
const express = require('express');
const router = express.Router();
const StudentProfile = require('../../models/StudentSchema');

router.delete('/deleteStudentProfile/:id', async (req, res) => {
  try {
    const deletedProfile = await StudentProfile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).send('Student profile not found');
    }
    res.send('Student profile deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

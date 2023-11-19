
const express = require('express');
const router = express.Router();
const CompanyProfile = require('../models/CompanySchema');

router.delete('/deleteCompanyProfile/:id', async (req, res) => {
  try {
    const deletedProfile = await CompanyProfile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) {
      return res.status(404).send('Company profile not found');
    }
    res.send('Company profile deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

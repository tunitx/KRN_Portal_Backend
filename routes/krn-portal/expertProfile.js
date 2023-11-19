
const express = require('express');
const router = express.Router();

const ExpertProfile = require('../models/ExpertSchema');

router.post('/postExpertProfile', async (req, res) => {
  try {
    const { name, email, contactNumber, domain, subDomain } = req.body;

    const newExpertProfile = new ExpertProfile({
      name,
      email,
      contactNumber,
      domain,
      subDomain
    });

    await newExpertProfile.save();

    res.status(201).json({ message: 'Expert profile created successfully', newExpertProfile });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create expert profile', error });
  }
});

// Export router
module.exports = router;

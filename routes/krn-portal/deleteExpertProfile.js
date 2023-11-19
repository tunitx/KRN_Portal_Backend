
const express = require('express');
const router = express.Router();
const ExpertProfile = require('../../models/ExpertSchema');

router.delete('/deleteExpertProfile/:id', async (req, res) => {
  try {
    const expertProfile = await ExpertProfile.findByIdAndDelete(req.params.id);
    if (!expertProfile) {
      return res.status(404).send();
    }
    res.send(expertProfile);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

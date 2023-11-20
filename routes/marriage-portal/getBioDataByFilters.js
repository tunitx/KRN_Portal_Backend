const express = require('express');
const router = express.Router();
const MarriageSchema = require('../../models/marriageSchema'); 

router.get('/getBioDataByFilters', async (req, res) => {
  try {
    const { gender, caste, subcaste, gotra, height, ageRange, manglik } = req.query;
      
    // Parse ageRange into an object
    const parsedAgeRange = JSON.parse(ageRange);
    console.log(parsedAgeRange);
      let query = {};

      if (gender) {
          query.gender = gender;
      }
      if (caste) {
          query.caste = caste;
      }
      if (subcaste) {
          query.subcaste = subcaste;
      }
      if (manglik) {
          query.manglik = manglik;
      }
      if (gotra && gotra.length > 0 && !gotra.includes('none')) {
          query.gotra = { $nin: gotra };
      }
      if (height) {
          if (height === 'Less than 4 fts') {
            query.heightInCms = { $lt: 4 * 30.48 };
          } else if (height === 'Greater than 6.5 fts') {
            query.heightInCms = { $gt: 6.5 * 30.48 };
          } else {
            const [minHeight, maxHeight] = height.replace(' fts', '').split('-');
            query.heightInCms = {
              $gte: parseFloat(minHeight) * 30.48,
              $lt: parseFloat(maxHeight) * 30.48
            };
          }
      }
      if (ageRange) {
        const parsedAgeRange = JSON.parse(ageRange);
        console.log(parsedAgeRange);

        if (parsedAgeRange.min && parsedAgeRange.max) {
            query.age = {
                $gte: parsedAgeRange.min,
                $lte: parsedAgeRange.max
            };
            console.log(query.age);
        }
    }
                     
      const marriageSchemas = await MarriageSchema.find(query);

      res.json(marriageSchemas);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
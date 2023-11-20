
const express = require('express');
const router = express.Router();
const MarriageSchema = require('../../models/marriageSchema'); 

router.get('/getBioDataByFilters', async (req, res) => {
  try {
      const { gender, caste, subcaste, gotra, height, age, manglik } = req.query;
      let heightQuery;
      if (height) {
          if (height === 'Less than 4 fts') {
            heightQuery = { $lt: 4 * 30.48 };
          } else if (height === 'Greater than 6.5 fts') {
            heightQuery = { $gt: 6.5 * 30.48 };
          } else {
            const [minHeight, maxHeight] = height.replace(' fts', '').split('-');
            heightQuery = {
              $gte: parseFloat(minHeight) * 30.48,
              $lt: parseFloat(maxHeight) * 30.48
            };
          }
      }
      let ageQuery;
      if (age) {
          ageQuery = {
              $gte: parseInt(age) - 2,
              $lte: parseInt(age) + 2
          };
      }

      const query = {
          gender,
          caste,
          subcaste,
          heightInCms: heightQuery,
          age : ageQuery,
          manglik
      };
      if (gotra && gotra.length > 0 && !gotra.includes('none')) {
          query.gotra = { $in: gotra };
      }
                     
      const marriageSchemas = await MarriageSchema.find(query);

      res.json(marriageSchemas);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
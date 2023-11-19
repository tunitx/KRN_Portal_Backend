
const express = require('express');
const router = express.Router();
const Query = require('../models/QuerySchema');

router.post('/postQuery', async (req, res) => {
    const { name, email, contactNumber, domain, subDomain, query } = req.body;
    const newQuery = new Query({
        name,
        email,
        contactNumber,
        domain,
        subDomain,
        query
    });

    try {
        await newQuery.save();
        res.status(200).json({ message: 'Query received successfully', newQuery });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving query to database' });
    }
});

module.exports = router;

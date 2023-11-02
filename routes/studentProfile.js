const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');
const StudentProfile = require('../models/StudentSchema');

const { uploadS3, uploadPdfS3 } = require("../utils/awsConfig")

// ?? POST /postStudentProfile

router.post('/postStudentProfile',verifyToken, uploadS3.single('photo'), uploadPdfS3.single('resume'), async (req, res) => {
    try {
        const { name, dob, email, contactNumber, address, domain, yearsOfExperience } = req.body;
        const photoUrl = req.file.location;
        const resumeUrl = req.file.location;

        const studentProfile = await StudentProfile.create({
            name,
            dob,
            email,
            contactNumber,
            address,
            photoUrl,
            resumeUrl,
            domain,
            yearsOfExperience
        });
        await studentProfile.save();
        res.status(201).json({
            message: 'Student profile created successfully',
            studentProfile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});

module.exports = router;

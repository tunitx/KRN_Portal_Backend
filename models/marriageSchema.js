const mongoose = require('mongoose');

const marriageSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    caste: {
        type: String,
        required: true
    },
    subcaste: {
        type: String,
        required: true
    },
    gotra: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    manglik: {
        type: String,
        enum: ['Yes', 'No', 'Anshik'],
        required: true
    },
    placeOfBirth: {
        type: String,
        required: true
    },
    currentAddress: {
        type: String,
        required: true
    },
    nativePlace: {
        type: String,
        required: true
    },
    heightInFeet: {
        type: Number,
        required: true
    },
    heightInCms: {
        type: Number,
        required: true
    },
    complexion: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    incomeBracket: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    },
    confirmationAndConsent: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Marriage = mongoose.model('Marriage', marriageSchema);

module.exports = Marriage;

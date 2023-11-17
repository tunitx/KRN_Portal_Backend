const mongoose = require('mongoose');

const marriageSchema = new mongoose.Schema({
    gender: {
        type: String,
        // enum: ['Male', 'Female'],
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
    age : {
        type: Number,
        required: true
    },
    manglik: {
        type: String,
        // enum: ['yes', 'no', 'anshik'],
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
    countryType: {
        type: String,
        required: true
    },
    country : {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
      type: String,
      required : true  
    },
    heightInCms: {
        type: String,
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
    occupation:{
        type: String,
        required: true
    },
    incomeBracket: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        // enum: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'],
        required: true
    },
    pwd:{
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    phoneNumber1 :{
        type: Number,
        required: true
    },
    phoneNumber2 :{
        type: Number,
        required: true
    },
    email : {
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

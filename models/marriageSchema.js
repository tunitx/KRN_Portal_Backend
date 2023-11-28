const mongoose = require('mongoose');

const marriageSchema = new mongoose.Schema({
    gender: {
        type: String,
        // enum: ['Male', 'Female'],
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    surname : {
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
    },
   
    location: {
        type: String,
    },
    countryType: {
        type: String,
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
    currentAddress: {
        type: String,
        required: true
    },

    nativePlaceLocation: {
        type: String,
        required: true
    },
    nativePlaceCountry:{
        type: String,
        required: true
    },
    nativePlaceState: {
        type: String,
        required: true
    },
    nativePlaceCity:{
        type: String,
        required: true
    },
    nativePlaceCurrentAddress:{
        type: String,
        required: true
    },
    currentAddressLocation:{
        type: String,
        required: true
    
    },
    currentAddressCountry:{
        type: String,
        required: true
    },
    currentAddressState:{
        type: String,
        required: true
    },
    currentAddressCity:{
        type: String,
        required: true
    },
    currentAddressScope:{
        type: String,
        required: true
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
    profession:{
        type: String,
        required: false
    },
    otherProfession:{
        type: String,
        required: false
    },
    serviceType:{
        type: String,
        required: false
    },
    serviceDetails:{
        type: String,
        required: false
    },
    educationDetails:{
        type: String,
        required: false
    },
    businessDetails:{
        type: String,
        required: false
    },
    selfEmployeeDetails:{
        type: String,
        required: false
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
        required: false
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

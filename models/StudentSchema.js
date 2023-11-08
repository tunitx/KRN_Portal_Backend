const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photo: {
        type : String,
        required: true
    },
    resume: {
       type : String,
        required: true
    },
    domain: {
        type: [],
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    date_of_log : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Student', studentSchema);

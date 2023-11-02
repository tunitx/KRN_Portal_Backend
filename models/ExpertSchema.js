const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    domain: {
        type: [],
        required: true
    },
    subDomain: {
        type: [],
        required: true
    }
});

module.exports = mongoose.model('Expert', expertSchema);

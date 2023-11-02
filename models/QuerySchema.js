const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    },
    query: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Query', QuerySchema);

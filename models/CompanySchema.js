const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
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
    file: {
        type: String,
        required: true
    }
});

// CompanySchema.virtual('fileURL').get(function() {
//     if (this.file && this.file.contentType === 'application/pdf') {
//         return `data:application/pdf;base64,${this.file.toString('base64')}`;
//     }
// });

// CompanySchema.statics.uploadFile = async function(id, buffer) {
//     const company = await this.findById(id);
//     company.file = buffer;
//     await company.save();
//     return company;
// };

// CompanySchema.pre('save', function(next) {
//     if (this.file && this.file.length > 1000000) {
//         return next(new Error('File size must be less than 1MB'));
//     }
//     next();
// });

module.exports = mongoose.model('Company', CompanySchema);

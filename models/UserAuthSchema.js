const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Student'
    },
    company : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Company'
    },
    query : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Query'
    },
    isSuperAdmin : {
        type : Boolean,
        required : false,
    },
    isStudentAdmin : {
        type: Boolean,
        required: false
    },
    isCompanyAdmin : {
        type: Boolean,
        required: false
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

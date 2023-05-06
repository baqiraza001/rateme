const mongoose = require("mongoose")
const moment = require("moment/moment");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        maxlength: 20
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    passwordResetCode: {
        type: String
    },
    type: {
        type: Number,
        required: true,
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdOn: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    },
    modifiedOn: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    },

});

const User = mongoose.model("users", userSchema);

module.exports = User;
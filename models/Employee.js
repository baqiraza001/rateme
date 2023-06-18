const mongoose = require("mongoose")
const moment = require("moment/moment");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    phone: {
        type: String,
        maxlength: 20,
        index: true
    },
    cnic: {
        type: String,
        index: true
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId
    },
    profilePicture: {
        type: String,
    },
    designation: {
        type: String
    },
    rating: {
        type: Number,
    },
    createdOn: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    },
    modifiedOn: {
        type: Date,
        default: moment().format('YYYY-MM-DD')
    }
});


employeeSchema.index({ name: "text", email: "text", phone_number: "text", cnic: "text" }); // create an index on multiple fields

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
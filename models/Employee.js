const mongoose = require("mongoose")
const moment = require("moment/moment");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        maxlength: 20,
    },
    cnic: {
        type: String,
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


employeeSchema.index({ name: "text", email: "text", phone: "text", cnic: "text", designation: "text" }); // create an index on multiple fields

const Employee = mongoose.model("employees", employeeSchema);

module.exports = Employee;
const mongoose = require("mongoose")
const moment = require("moment/moment");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    maxlength: 20,
  },
  logo: {
    type: String,
  },
  address: {
    type: String,
  },
  assigned_to: {
    // type: mongoose.Schema.users.ObjectId
    type: String
  },
  average_rating: {
    type: String,
  },
  active: {
    type: Number,
  },
  created_on: {
    type: Date,
    default: moment().format('YYYY-MM-DD')
  },
  modified_by: {
    // type: mongoose.Schema.users.ObjectId
    type: String
  },
  modified_on: {
    type: Date,
    default: moment().format('YYYY-MM-DD')
  },

});


const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;
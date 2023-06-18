const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const Rating = require("../models/Rating");
const { verifyUser } = require('../middlewares/auth');
const { userTypes } = require("../utils/util");
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');


router.use(["/add", "/edit", "/delete", "/details/:employeeId", "/search"], verifyUser);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(`content/${req.body.deptId}/`, { recursive: true });
      cb(null, `content/${req.body.deptId}/`);
    } catch (err) {
      cb(err, null);
    }

  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['jpg', 'png', 'gif', 'bmp', 'jpeg'];
    const ext = path.extname(file.originalname).replace('.', '');
    if (allowedTypes.includes(ext))
      cb(null, true);
    else {
      cb(new Error("File type is not allowed"), false);
    }
  }
});

router.post("/add", upload.single('profilePicture'), async (req, res) => {
  try {

    //only standard admin can add employee to his own department only
    if (req.user.type !== userTypes.USER_TYPE_SUPER && req.body.deptId !== req.user.departmentId.toString())
      throw new Error("Invalid Request");

    const department = await Department.findById(req.body.deptId);
    if (!department) throw new Error("Department does not exists");

    const {
      name,
      email,
      phone,
      cnic,
      designation
    } = req.body;

    const employee = new Employee({
      name,
      email,
      phone,
      cnic,
      departmentId: department._id,
      designation,
      profilePicture: req.file ? req.file.filename : '',
      createdOn: new Date(),
      modifiedOn: new Date()
    })

    await employee.save();
    res.json({ success: true });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/edit", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Employee id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("Employee id is invalid");

    //only standard admin can add employee to his own department only
    if (req.user.type !== userTypes.USER_TYPE_STANDARD)
      throw new Error("Invalid Request");

    const department = await Department.findOne({ userId: req.user._id });
    if (!department) throw new Error("Department does not exists");

    if (req.user._id.toString() !== department.userId.toString())
      throw new Error("Invalid Request");

    const employee = await Employee.findById(req.body.id);
    if (!employee) throw new Error("Employee does not exists");

    //check if standard admin is updating its own employee only
    if (department._id.toString() !== employee.departmentId.toString()) // to string is used to convert req.user._id to string because this returns new ObjectId("6439f4ca31d7babed61963e0") that is object user id and we need only string to compare it.
      throw new Error("Invalid request");

    await Employee.updateOne(
      { _id: employee._id, departmentId: department._id },
      { $set: req.body }
    );

    const updatedEmployee = await Employee.findById(req.body.id);

    res.json({ employee: updatedEmployee });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/details/:employeeId", async (req, res) => {
  try {
    if (!req.params.employeeId) throw new Error("Employee id is required");
    if (!mongoose.isValidObjectId(req.params.employeeId))
      throw new Error("Employee id is invalid");

    //only standard admin can add employee to his own department only
    if (req.user.type !== userTypes.USER_TYPE_STANDARD)
      throw new Error("Invalid Request");

    const department = await Department.findOne({ userId: req.user._id });
    if (!department) throw new Error("Department does not exists");

    if (req.user._id.toString() !== department.userId.toString())
      throw new Error("Invalid Request");

    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) throw new Error("Employee does not exists");

    //check if standard admin is getting its own employee only
    if (department._id.toString() !== employee.departmentId.toString()) // to string is used to convert req.user._id to string because this returns new ObjectId("6439f4ca31d7babed61963e0") that is object user id and we need only string to compare it.
      throw new Error("Invalid request");

    res.json(employee);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.post("/delete", async (req, res) => {
  try {

    if (!req.body.id) throw new Error("Employee id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("Employee id is invalid");

    const employee = await Employee.findById(req.body.id);
    if (!employee) throw new Error("Employee does not exists");

    if (req.user.type !== userTypes.USER_TYPE_SUPER && employee.departmentId.toString() !== req.user.departmentId.toString())
      throw new Error("invalid Request");

    await Employee.findByIdAndDelete(req.body.id);
    if (employee.profilePicture)
      await fs.unlink(`content/${employee.departmentId}/${employee.profilePicture}`);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.post("/search", async (req, res) => {
  try {

    if (req.user.type !== userTypes.USER_TYPE_SUPER && req.body.deptId !== req.user.departmentId.toString())
      throw new Error("invalid Request");

    const department = await Department.findById(req.body.deptId);
    if (!department) throw new Error("Department does not exists");

    const conditions = { departmentId: req.body.deptId };

    const employees = await Employee.find(conditions);

    res.status(200).json({ department, employees });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/feedback", async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      feedbackText,
      employeeId,
      rating,
    } = req.body;
    const employee = await Employee.findById(employeeId)
    if (!employee)
      throw new Error("Invalid Id");

    if (rating < 0 || rating > 5)
      throw new Error("Invalid Request")

    const ratingData = new Rating({
      name,
      phoneNumber,
      feedbackText,
      departmentId: employee.departmentId,
      employeeId,
      rating,
    })
    await ratingData.save()
    res.json({ rating: ratingData })

  } catch (err) {
    res.status(400).json({ error: err.message })
  }

})


module.exports = router;
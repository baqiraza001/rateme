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


router.use(["/add", "/edit", "/delete", "/details/:employeeId", "/search", '/dashboard'], verifyUser);

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

router.post("/edit", upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Employee id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("Employee id is invalid");

    const employee = await Employee.findById(req.body.id);
    if (!employee) throw new Error("invalid employee id");


    if (req.user.type !== userTypes.USER_TYPE_SUPER && employee.departmentId.toString() !== req.user.departmentId.toString())
      throw new Error("Invalid Request");

    const {
      name,
      email,
      phone,
      cnic,
      designation
    } = req.body;

    const record = {
      name,
      email,
      phone,
      cnic,
      designation,
      modifiedOn: new Date(),
    }
    if (req.file && req.file.filename) {
      record.profilePicture = req.file.filename;
      if (employee.profilePicture && employee.profilePicture !== req.file.filename)
        fs.access(`./content/${employee.departmentId}/${employee.profilePicture}`, require('fs').constants.F_OK).then(async () => {
          await fs.unlink(`./content/${employee.departmentId}/${employee.profilePicture}`);
        }).catch(err => {
        })
    }

    const updatedEmployee = await Employee.findById(req.body.id);

    await Employee.findByIdAndUpdate(req.body.id, record);
    res.json({ success: true });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/details/:employeeId", async (req, res) => {
  try {
    if (!req.params.employeeId) throw new Error("Employee id is required");
    if (!mongoose.isValidObjectId(req.params.employeeId))
      throw new Error("Employee id is invalid");

    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) throw new Error("invalid employee id");

    if (req.user.type !== userTypes.USER_TYPE_SUPER && employee.departmentId.toString() !== req.user.departmentId.toString())
      throw new Error("Invalid Request");

    res.json({ employee });

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

    const filter = { departmentId: req.body.deptId };
    if (req.body.query)
      filter['$text'] = { $search: req.body.query, $language: 'en' };

    const page = req.body.page ? req.body.page : 1;
    const skip = (page - 1) * process.env.RECORDS_PER_PAGE;

    const employees = await Employee.find(filter, { _id: 1, profilePicture: 1, name: 1, phone: 1, cnic: 1 }, { limit: process.env.RECORDS_PER_PAGE, skip });

    const totalEmployees = await Employee.countDocuments(filter);
    const numOfPages = Math.ceil(totalEmployees / process.env.RECORDS_PER_PAGE);

    res.status(200).json({ department, employees, numOfPages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const stats = {
      departments: 0,
      employees: 0,
      ratings: 0
    }

    if (req.user.type == userTypes.USER_TYPE_SUPER)
      stats.departments = await Department.estimatedDocumentCount();

    if (req.user.type == userTypes.USER_TYPE_SUPER) {
      stats.employees = await Employee.estimatedDocumentCount();
      stats.ratings = await Rating.estimatedDocumentCount();
    } else {
      stats.employees = await Employee.countDocuments({ departmentId: req.user.departmentId });
      stats.ratings = await Rating.countDocuments({ departmentId: req.user.departmentId });
    }

    res.json({ stats });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

router.post("/publicSearch", async (req, res) => {
  try {

    if (!req.body.departmentId)
      throw new Error("departmentId is required");
    if (!req.body.name)
      throw new Error("name is required");

    const department = await Department.findById(req.body.departmentId);
    if (!department) throw new Error("Department does not exists");

    const filter = { departmentId: req.body.departmentId, name: { $regex: req.body.name, $options: 'i' } };

    const employees = await Employee.find(filter, { _id: 1, profilePicture: 1, name: 1 });


    res.status(200).json({ employees });
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
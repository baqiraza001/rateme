const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Department = require("../models/Department");
const { verifyUser } = require('../middlewares/auth');


// router.use(verifyUser);


router.post("/add", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      logo,
      address,
      assigned_to
    } = req.body;


    const department = new Department({
      name,
      email,
      phone,
      logo,
      address,
      assigned_to
    })

    await department.save();
    res.json({ department });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/edit", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Department id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("Dpartment id is invalid");

    const department = await Department.findById(req.body.id);
    if (!department) throw new Error("Department does not exists");

    // if (req.user._id.toString() !== req.body.id) // to string is used to convert req.user._id to string because this returns new ObjectId("6439f4ca31d7babed61963e0") that is object user id and we need only string to compare it.
    //   throw new Error("Invalid request");

    const {
      name,
      email,
      phone,
      logo,
      address,
      assigned_to
    } = req.body;


    let updatedDepartment = await Department.findByIdAndUpdate(req.body.id, {
      name,
      email,
      phone,
      logo,
      address,
      assigned_to
    })

    res.json({ department: updatedDepartment });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete("/delete", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("Department id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("Department id is invalid");

    const department = await Department.findById(req.body.id);
    if (!department) throw new Error("Department does not exists");

    await Department.findByIdAndDelete(req.body.id);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json({ departments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
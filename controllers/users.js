const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createJWTToken } = require("../../server/utils/util");
const { verifyUser } = require('../middlewares/auth');


router.use(['/add', '/edit', '/delete', '/profile', '/profile-update'], verifyUser);


router.post("/add", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  try {
    if (userExist) throw new Error("This email is already registered");

    const {
      name,
      email,
      phone_number,
      profile_picture,
      password,
      type,
      active,
      created_on,
      modified_on
    } = req.body;


    const user = new User({
      name: name,
      email,
      phone_number,
      profile_picture,
      password: await bcrypt.hash(req.body.password, 10),
      type,
      active,
      created_on,
      modified_on
    })

    await user.save();
    res.json({ user });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/edit", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email, _id: { $ne: req.body.id } });
  try {
    if (userExist) throw new Error("This email is already registered");

    if (!req.body.id) throw new Error("User id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("User id is invalid");
    if (req.user._id.toString() !== req.body.id) // to string is used to convert req.user._id to string because this returns new ObjectId("6439f4ca31d7babed61963e0") that is object user id and we need only string to compare it.
      throw new Error("Invalid request s");

    const user = await User.findById(req.body.id);
    if (!user) throw new Error("User does not exists");


    const {
      name,
      email,
      phone_number,
      profile_picture,
      password,
      type,
      active,
      created_on,
      modified_on
    } = req.body;


    let updatedUser = await User.findByIdAndUpdate(req.body.id, {
      name: name,
      email,
      phone_number,
      profile_picture,
      password: await bcrypt.hash(req.body.password, 10),
      type,
      active,
      modified_on
    })

    res.json({ user: updatedUser });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.delete("/delete", async (req, res) => {
  try {
    if (!req.body.id) throw new Error("User id is required");
    if (!mongoose.isValidObjectId(req.body.id))
      throw new Error("User id is invalid");

    const user = await User.findById(req.body.id);
    if (!user) throw new Error("User does not exists");

    await User.findByIdAndDelete(req.body.id);

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/profile", async (req, res) => {

  try {
    let user = await User.findById(req.user._id);

    user = user.toObject(); 
    delete user.password;

    res.json({user})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});


router.post("/profile-update", async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email, _id: { $ne: req.user._id } });
  try {
    if (userExist) throw new Error("This email is already registered");

    const {
      name,
      email,
      phone_number,
      profile_picture,
      password,
      type,
      active,
      created_on,
      modified_on
    } = req.body;


    let updatedUser = await User.findByIdAndUpdate(req.user._id, {
      name: name,
      email,
      phone_number,
      profile_picture,
      password: await bcrypt.hash(req.body.password, 10),
      type,
      active,
      modified_on
    })
    updatedUser = updatedUser.toObject(); 
    delete updatedUser.password;
    res.json({ user: updatedUser });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/signin", async (req, res) => {

  try {
    if (!req.body.email) throw new Error("Email is required");
    if (!req.body.password) throw new Error("Password is required");
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Email or password is incorrect");
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error("Email or password is incorrect");

    user = user.toObject(); 
    delete user.password;
    
    const token = await createJWTToken(user, 12);

    res.json({ user, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const verifyToken = require("../utils/verifyToken");
const User = require("../models/UserAuthSchema");
const db = require("../utils/db");


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
  
    //? populate the user object with the khojoUserProfiles array
    const currUser = await User.findById(user._id)
    .populate({ path: "student"});
  
    // ? Send JWT token in response
  
    res.json({ message: "Login successful", token, currUser });
  });


  module.exports = router;
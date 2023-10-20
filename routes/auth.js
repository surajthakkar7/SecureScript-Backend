const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET_KEY = "gujju7";

// Route 1 : Create a User using  : POST "/api/auth/createuser" . No login required
router.post(
  "/createuser",
  [
    body("name", "Username is required").notEmpty(),
    body("email", "Valid email is required").isEmail(),
    body("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    let success = false;
    console.log(req.body);

    //if there are errors ,return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //check whether the user with this email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      //creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);
      console.log(authtoken);
      success = true;
      res.status(200).json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      success = false; // Set success to false on error
      res.status(500).send("Internal server Error(Error in creating user)");
    }
  }
);

// Route 2: Authenticate a User using POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Valid email is required").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    try {
      let success = false;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;

      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error!");
    }
  }
);

// Route 3: Get logged-in User details using POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error!");
  }
});

module.exports = router;

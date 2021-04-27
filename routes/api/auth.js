const { response } = require("express");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../midleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

// @route   Get api/auth
// @desc    Authorize User
// @access  Public
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route   Post api/auth/login
// @desc    Authenticate user
// @access  Public
router.post(
  "/login",
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Please enter a valid Password").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(({ errors: [{ msg: "Invalid Credentials" }] }));
    }
    /// if errors are empty then we have to register user
    const { email, password } = req.body;

    try {
      /// first check if user exist
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json(({ errors: [{ msg: "Invalid Credentials" }] }));
      }
      // match password

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(400).json(({ errors: [{ msg: "Invalid Credentials" }] }));
      }

      //// now get JWT (json web token)
      const payload = {
        user: {
          id: user.id, /// this id will come from mongo db after saving user to document in the db
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.json({ token });
          }
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error" + error);
    }
  }
);
module.exports = router;

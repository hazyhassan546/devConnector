const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// @route   Post api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  body("name", "Please enter a name").not().isEmpty(),
  body("email", "Please enter a valid email").isEmail(),
  body("password", "Please enter a valid Password").isLength({
    min: 6,
    max: 40,
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }
    console.log(req.body);
    res.send("Users Route");
  }
);

module.exports = router;

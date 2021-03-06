const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
var multer = require("multer");
const auth = require("../../midleware/auth");

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }
    /// if errors are empty then we have to register user
    const { name, email, password } = req.body;

    try {
      /// first check if user already exist
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      /// password encryption
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //// save user
      await user.save();
      /////

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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");
router.post("/profileImage", auth, async (req, res) => {
  const UserId = req.user.id;
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    try {
      let user = await User.findOne({ _id: UserId });
      let ImagePath = req.file.filename;
      if (user) {
        user = await User.findOneAndUpdate(
          { _id: req.user.id },
          {
            $set: { avatar: ImagePath },
          },
          {
            new: true,
          }
        );

        return res.status(200).send(req.file);
      } else {
        return res.status(400).send("User Not Found");
      }
    } catch (error) {
      return res.status(500).json({
        errors: {
          msg: "Internal server error",
        },
      });
    }
  });
});

module.exports = router;

const express = require("express");
const auth = require("../../midleware/auth");
const router = express.Router();
const Profile = require("../../models/Profile");
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
const request = require("request");
const config = require("config");

// ------------------------------------- Get My Profiles API ---------------------------
// @route   Get api/profile/me
// @desc    Test route
// @access  Public
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR" + error);
  }
});

// ------------------------------------- Get All Profiles API ---------------------------
// @route   Get api/profile
// @desc    Test route
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR" + error);
  }
});

// ------------------------------------- Get Profile by ID API ---------------------------
// @route   post api/profile/byID
// @desc    Test route
// @access  Public
router.post(
  "/byID",
  [body("userId", "userId is required").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const myProfile = await Profile.findOne({
        user: req.body.userId,
      }).populate("user", ["name", "avatar"]);

      if (myProfile) {
        return res.json(myProfile);
      } else {
        return res.status(400).send("No user found by given id.");
      }
    } catch (error) {
      // console.error(error);
      if (error.kind === "ObjectId") {
        return res.status(400).send("Profile not found");
      }
      res.status(500).send("SERVER ERROR" + error);
    }
  }
);

// ------------------------------------- Create Or Update Profile API ---------------------------
// @route   POST api/profile
// @desc    Create or Update a profile
// @access  Private
router.post(
  "/create_or_update_Profile",
  [
    auth,
    [
      body("status", "status is required").notEmpty(),
      body("skills", "skills is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    // validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure body
    const {
      company,
      website,
      location,
      status,
      skills, // comma separated array
      bio,
      githubUserName,
      experience, // array
      education, // array
      youtube,
      twitter,
      facebook,
      instagram,
      linkedin,

      date,
    } = req.body;

    // now we have to make a Object for the profile table  to save in db. in-order to create or update data.
    let profileFields = {};
    profileFields.user = req.user.id; ///  this user comes from the auth token (from middleware)
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status; // required
    if (bio) profileFields.bio = bio;
    if (githubUserName) profileFields.githubUserName = githubUserName;
    if (date) profileFields.date = date;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim()); // required
    }
    profileFields.social = {
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
    };
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    //   ----now DB transaction----
    try {
      let profile = await Profile.findOne({ user: req.user.id }); // it will check that user already exist or not
      if (profile) {
        /// update case
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: profileFields,
          },
          {
            new: true,
          }
        );

        return res.json(profile);
      } else {
        //// Create new case
        profile = new Profile(profileFields);
        profile.save();
        res.send("Profile Created");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- Delete Complete Profile API ---------------------------
// @route   DELETE api/profile/delete_profile
// @desc    Delete Complete profile
// @access  Private

router.delete("/delete_profile", auth, async (req, res) => {
  try {
    /// 1: todo delete user posts
    await Post.deleteMany({ user: req.user.id });
    /// 2: delete user profile
    await Profile.findOneAndRemove({ user: req.user.id });
    /// 3: delete profile
    await User.findOneAndRemove({ _id: req.user.id });
    res.send("User deleted successfully");
    /// 3: delete user
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR");
  }
});

// ------------------------------------- Add Experience API ---------------------------
// @route   PUT api/profile/add_experience
// @desc    Add Experience to profile
// @access  Private

router.put(
  "/add_experience",
  [
    auth,
    [
      body("title", "please add a title").notEmpty(),
      body("company", "please add a company").notEmpty(),
      body("from", "please add a from date").notEmpty().isDate(),
    ],
  ],
  async (req, res) => {
    try {
      /// validation check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        company,
        from,
        to,
        location,
        current,
        description,
      } = req.body;

      const newExp = {};
      if (title) newExp.title = title;
      if (company) newExp.company = company;
      if (from) newExp.from = from;
      if (to) newExp.to = to;
      if (location) newExp.location = location;
      if (current) newExp.current = current;
      if (description) newExp.description = description;

      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        await profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
      } else {
        res.status(400).send("Profile not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- Delete Experience by ID API ---------------------------
// @route   DELETE api/profile/delete_experience_by_id
// @desc    Delete Experience to profile
// @access  Private

router.post(
  "/delete_experience_by_id",
  [auth, [body("exp_id", "exp_id is required").notEmpty()]],
  async (req, res) => {
    try {
      /// validation check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { exp_id } = req.body;
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        const remove_index = profile.experience
          .map((item) => item.id)
          .indexOf(exp_id);
        await profile.experience.splice(remove_index, 1);
        await profile.save();
        res.json(profile);
      } else {
        res.status(400).send("Profile not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- Add Education API ---------------------------
// @route   PUT api/profile/add_education
// @desc    Add Education to profile
// @access  Private

router.put(
  "/add_education",
  [
    auth,
    [
      body("school", "please add a school").notEmpty(),
      body("degree", "please add a degree").notEmpty(),
      body("fieldofstudy", "add field of study").notEmpty(),
      body("from", "please add a from date").notEmpty().isDate(),
    ],
  ],
  async (req, res) => {
    try {
      /// validation check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      } = req.body;

      const newEducation = {};
      if (school) newEducation.school = school;
      if (degree) newEducation.degree = degree;
      if (fieldofstudy) newEducation.fieldofstudy = fieldofstudy;
      if (to) newEducation.to = to;
      if (from) newEducation.from = from;
      if (current) newEducation.current = current;
      if (description) newEducation.description = description;

      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        await profile.education.unshift(newEducation);
        await profile.save();
        res.json(profile);
      } else {
        res.status(400).send("Profile not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- Delete Education by ID API ---------------------------
// @route   DELETE api/profile/delete_education_by_id
// @desc    Delete Education to profile
// @access  Private

router.post(
  "/delete_education_by_id",
  [auth, [body("edu_id", "edu_id is required").notEmpty()]],
  async (req, res) => {
    try {
      /// validation check
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { edu_id } = req.body;
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        const remove_index = profile.education
          .map((item) => item.id)
          .indexOf(edu_id);
        await profile.education.splice(remove_index, 1);
        await profile.save();
        res.json(profile);
      } else {
        res.status(400).send("Profile not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- Get Github Repositories API ---------------------------
// @route   Post api/profile/gihubrepositories
// @desc    Get user Github Repos
// @access  Private
router.post(
  "/gihubrepositories",
  [body("github_usr_name", "please add github_user_name").notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //// Get github Repos for this user.
    try {
      const options = {
        uri: `https://api.github.com/users/${
          req.body.github_usr_name
        }/repos?per_page=5&sort=created: asc&client_id=${config.get(
          "githubClientId"
        )}&client_secret=${config.get("githubClientSecret")}`,
        method: "GET",
        headers: { "user-agent": "Node.js" },
      };

      request(options, (error, response, body) => {
        if (error) {
          return console.error(error);
        }

        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: "github profile not found" });
        }

        res.json(JSON.parse(body));
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

module.exports = router;

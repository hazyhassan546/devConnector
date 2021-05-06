const express = require("express");
const { body, validationResult } = require("express-validator");
const auth = require("../../midleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const router = express.Router();

// @route   Get api/posts
// @desc    get all posts
// @access  Private
router.get("/getAllPosts", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR");
  }
});

// ------------------------------------- SINGLE POST API ---------------------------
// @route   POST api/post/postById
// @desc    Add post to its timeline
// @access  Private
router.post(
  "/postById",
  [auth, [body("postId", "Post text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      /// get user and post
      const post = await Post.findById(req.body.postId);
      if (!post) {
        return res.status(400).json({ msg: "Post not found" });
      } else {
        res.json(post);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- ADD POST API ---------------------------
// @route   POST api/add_post
// @desc    Add post to its timeline
// @access  Private
router.post(
  "/add_post",
  [auth, [body("text", "Post text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      /// get user
      const user = await User.findById(req.user.id).select("-password");
      ///
      const { text } = req.body;
      const newPost = new Post({
        user: req.user.id,
        text: text,
        name: user.name,
        avatar: user.avatar,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- DELETE POST API ---------------------------
// @route   POST api/deletePost
// @desc    Add post to its timeline
// @access  Private
router.post(
  "/deletePost",
  [auth, [body("postId", "Post text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      /// get user and post
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.body.postId);
      if (!post) {
        return res.status(400).json({ msg: "Post not found" });
      }
      /// now check if the user  have same id as the post owners id
      if (user._id.toString() !== post.user.toString()) {
        return res
          .status(401)
          .json({ msg: "Un-authorized to delete this post" });
      }
      await post.remove();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- ADD LIKES To POST API ---------------------------
// @route   POST api/post/like
// @desc    Add likes to a post
// @access  Private
router.post(
  "/like",
  [auth, [body("postId", "please add postId").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findById(req.body.postId);

      /// now check if the user already liked post
      const Userlikes = post.likes.filter(
        (reaction) => reaction.user.toString() === req.user.id
      );

      if (Userlikes.length > 0) {
        /// error
        return res.status(400).json({ msg: "already liked this post" });
      } else {
        /// addd reaction
        const Reaction = {
          user: req.user.id,
        };
        post.likes.unshift(Reaction);
        await post.save();
        res.json(post.likes);
      }
    } catch (error) {
      console.error(error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- ADD UN-LIKES To POST API ---------------------------
// @route   POST api/post/unlike
// @desc    Add likes to a post
// @access  Private
router.post(
  "/unlike",
  [auth, [body("postId", "please add postId").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findById(req.body.postId);

      /// now check if the user already liked post
      const Userlikes = post.likes.filter(
        (reaction) => reaction.user.toString() === req.user.id
      );

      if (Userlikes.length === 0) {
        /// error
        return res.status(400).json({ msg: "you dont have liked this post" });
      } else {
        /// remove reaction
        const indexRemove = await post.likes
          .map((post) => post.user)
          .indexOf(req.user.id);
        post.likes.splice(indexRemove, 1);
        await post.save();
        res.json(post.likes);
      }
    } catch (error) {
      console.error(error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------ comment section ---------------------------

// ------------------------------------- ADD Comment To POST API ---------------------------
// @route   POST api/post//addComment
// @desc    Add Comment to a post
// @access  Private
router.post(
  "/addComment",
  [
    auth,
    [
      body("text", "Some text is required").notEmpty(),
      body("postId", "Please add postId").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.body.postId);
      if (post) {
        const comment = {
          user: req.user.id,
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
        };
        await post.comments.unshift(comment);
        await post.save();
        res.json(post);
      }
    } catch (error) {
      console.error(error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("SERVER ERROR");
    }
  }
);

// ------------------------------------- DELETE COMMENT To POST API ---------------------------
// @route   POST api/post/deleteComment
// @desc    delete Comment to a post
// @access  Private
router.post(
  "/deleteComment",
  [
    auth,
    [
      body("commentId", "please add commentId").notEmpty(),
      body("postId", "please add postId").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findById(req.body.postId);
      /// remove comment
      const removeIndex = await post.comments
        .map((comment) => comment._id)
        .indexOf(req.body.commentId);
      if (removeIndex !== -1) {
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.json(post);
      } else {
        return res.status(400).json({ msg: "Comment not found" });
      }
    } catch (error) {
      console.error(error);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "post not found" });
      }
      res.status(500).send("SERVER ERROR");
    }
  }
);
module.exports = router;

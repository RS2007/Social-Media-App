const commentModel = require("../models/comment");
const postModel = require("../models/post");

module.exports.createComment = async (req, res) => {
  try {
    const { id: user } = res.locals;
    const { content, postId } = req.body;
    const newComment = new commentModel({ user, content, postId });
    const savedComment = await newComment.save();
    console.log(savedComment);
    const post = await postModel.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
    });
    res.status(200).send("New comment created succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Database error");
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    console.log("hello");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports.getComment = async (req, res) => {
  try {
    console.log("hello");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports.updateComment = async (req, res) => {
  try {
    console.log("hello");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports.getAllCommentsForPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const comments = await commentModel.find({ postId }).populate("user");
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "DB error" });
  }
};

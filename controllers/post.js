const { _cloudinary } = require("../config/_cloudinary");
const postModel = require("../models/post");
const userModel = require("../models/user");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports.createPost = async (req, res) => {
  try {
    const { id: user } = res.locals;
    const { pic, desc } = req.body;
    const uploadResponse = await _cloudinary.uploader.upload(pic, {
      upload_preset: "fq7pbufy",
    });
    console.log(uploadResponse);
    const newPost = new postModel({
      user,
      pic: uploadResponse.secure_url,
      desc,
    });
    await newPost.save();
    res.status(200).send("New post created succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Database error");
  }
};

module.exports.deletePost = async (_, res) => {
  try {
    console.log("hello");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports.getPostsById = async (_, res) => {
  try {
    console.log("hello");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports.updatePost = async (_, res) => {
  try {
    console.log("hello");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports.getAllPosts = async (_, res) => {
  try {
    console.log(res.locals);
    const { id: userId } = res.locals;
    console.log(userId);
    const user = await userModel.findById(userId).lean().exec();
    const posts = await postModel
      .find({ user: user.following })
      .populate("user")
      .populate([
        {
          path: "comments",
          model: "comments",
          select: "content",
          populate: {
            path: "user",
            model: "users",
            select: "username",
          },
        },
      ])
      .exec();
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("error");
  }
};

module.exports.getAllPostsOfUser = async (_, res) => {
  try {
    const { id: userId } = res.locals;
    const userPosts = await postModel
      .find({ user: userId })
      .populate("user", { _id: 1, username: 1 })
      .populate([
        {
          path: "comments",
          model: "comments",
          select: "content",
          populate: {
            path: "user",
            model: "users",
            select: "username",
          },
        },
      ]);
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("error");
  }
};

module.exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = res.locals;
    const post = await postModel.findById(id).exec();
    console.log(id);
    if (post.likes.includes(userId)) {
      await postModel.findByIdAndUpdate(id, {
        $pull: { likes: userId },
      });
      res.status(200).send("Like successful");
    } else {
      await postModel.findByIdAndUpdate(id, {
        $push: { likes: userId },
      });
      res.status(200).send("Unlike successful");
    }
  } catch (error) {
    res.status(500).send("error");
  }
};

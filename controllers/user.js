const userModel = require("../models/user");
const {compare} = require("bcrypt");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

module.exports.getUserById = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await userModel.findById(id).exec();
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({error: "Database error"});
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

module.exports.getUserByUsernameRegex = async (req, res) => {
  try {
    const {q} = req.query;
    const searchUsers = await userModel.find({
      username: new RegExp(q, "i"),
    });
    res.status(200).json(searchUsers);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({error: "Database error"});
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports.getFollowers = async (req, res) => {
  try {
    const {id} = res.locals;
    const user = await userModel.findById(id).populate("followers").exec();
    res.status(200).json({followers: user.followers});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({error: "Database error"});
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports.register = async (req, res) => {
  try {
    const {email, password, fullName, username} = req.body;
    const newUser = await new userModel({
      email,
      password,
      fullName,
      username,
    });
    const {_id: id} = await newUser.save();
    res.cookie("USER_DETAILS", JSON.stringify({id, username, fullName}));
    res.status(200).send("You have registered succesfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Registration not succesful"});
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports.getFollowing = async (req, res) => {
  try {
    const {id} = res.locals;
    const user = await userModel.findById(id).populate("following").exec();
    res.status(200).json({following: user.following});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Database error"});
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports.deleteUser = async (req, res) => {
  try {
    const {id} = res.locals;
    await userModel.findByIdAndDelete(id).exec();
    res.status(200).send("User deleted succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Database error"});
  }
};


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports.editUser = async (req, res) => {
  try {
    const {id} = res.locals;
    await userModel.findByIdAndUpdate(id, req.body).exec();
    res.status(200).send("User edited succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Database error"});
  }
};


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports.followUser = async (req, res) => {
  try {
    const {id: userId} = res.locals;
    const {id: toFollowId} = req.params;
    const isFollowing = await userModel.findById(userId);
    if (!isFollowing.following.includes(toFollowId)) {
      await userModel
        .findByIdAndUpdate(userId, {
          $push: {following: toFollowId},
        })
        .exec();
      await userModel
        .findByIdAndUpdate(toFollowId, {
          $push: {followers: userId},
        })
        .exec();

      res.status(200).send("User followed succesfully");
    } else {
      await userModel
        .findByIdAndUpdate(userId, {
          $pull: {following: toFollowId},
        })
        .exec();
      await userModel
        .findByIdAndUpdate(toFollowId, {
          $pull: {followers: userId},
        })
        .exec();

      res.status(200).send("User unfollowed succesfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Database error"});
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const {
      _id: id,
      password: hashedPassword,
      username,
      fullName,
    } = await userModel.findOne({email}).lean().exec();
    console.log(password, hashedPassword);
    const passwordCorrect = await compare(password, hashedPassword);
    if (passwordCorrect) {
      res.cookie("USER_DETAILS", JSON.stringify({id, username, fullName}));
      res.status(200).send("Succesful Login");
    } else {
      res.status(400).json({error: "Incorrect Password"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "Database error"});
  }
};

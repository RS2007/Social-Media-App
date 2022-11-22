const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User required for uploading post"],
    },
    pic: {
      type: String,
    },
    desc: {
      type: String,
      max: [150, "Description character limit exceeded"],
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "comments" }],
    likes: [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

module.exports = new model("posts", postSchema);

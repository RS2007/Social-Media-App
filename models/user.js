const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { isEmail } = require("validator");
const { genSalt, hash } = require("bcrypt");

const userSchema = new Schema(
  {
    fullName: { type: String, required: [true, "name required"] },
    username: {
      type: String,
      unique: [true, "Username already exists"],
      required: [true, "username required"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      validate: {
        validator: isEmail,
        message: "{VALUE} is not a valid email",
        isAsync: false,
      },
      required: [true, "email required"],
    },
    dob: {
      type: Date,
      // required: [true, "enter date of birth"],
    },
    bio: {
      type: String,
      max: [100, "Character limit of bio exceeded"],
    },
    password: {
      type: String,
      required: [true, "Password required"],
      min: [6, "Minimum length of password is 6 digits"],
    },
    profilePicture: {
      type: String,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "users" }],
    following: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: { createdAt: true } }
);

userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  const hashedPassword = await hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

module.exports = new model("users", userSchema);

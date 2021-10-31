const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      minLength: 4,
      maxLength: 32,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    displayName: {
      type: String,
    },
    bio: {
      type: String,
    },
    title: {
      type: String,
      default: "Employee",
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

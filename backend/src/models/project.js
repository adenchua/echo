const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    announcement: {
      type: String,
      trim: true,
    },
    adminIds: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    memberIds: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    epicIds: {
      type: [Schema.Types.ObjectId],
      ref: "Epic",
    },
    backlogIds: {
      type: [Schema.Types.ObjectId],
      ref: "Story",
    },
    sprintIds: {
      type: [Schema.Types.ObjectId],
      ref: "Sprint",
    },
    picture: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

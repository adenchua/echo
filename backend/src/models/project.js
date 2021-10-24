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
    admins: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    epics: {
      type: [Schema.Types.ObjectId],
      ref: "Epic",
    },
    backlog: {
      type: [Schema.Types.ObjectId],
      ref: "Story",
    },
    sprints: {
      type: [Schema.Types.ObjectId],
      ref: "Sprint",
    },
    picture: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

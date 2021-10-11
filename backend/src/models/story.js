const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    assignees: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["todo", "progress", "review", "completed", "stuck"],
      default: "todo",
    },
    weight: {
      type: Number,
      default: 1,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "highest"],
      default: "medium",
    },
    type: {
      type: String,
      enum: ["story", "task", "bug"],
      default: "story",
    },
    subtasks: {
      type: [Schema.Types.ObjectId],
      ref: "Subtask",
    },
  },
  { versionKey: false }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;

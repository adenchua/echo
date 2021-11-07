const mongoose = require("mongoose");
const { Schema } = mongoose;

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    assigneeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["todo", "progress", "review", "completed", "stuck", "hold"],
      default: "todo",
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
    subtaskIds: {
      type: [Schema.Types.ObjectId],
      ref: "Subtask",
    },
    isInSprint: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;

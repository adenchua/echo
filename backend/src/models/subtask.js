const mongoose = require("mongoose");
const { Schema } = mongoose;

const subtaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Subtask = mongoose.model("Subtask", subtaskSchema);

module.exports = Subtask;

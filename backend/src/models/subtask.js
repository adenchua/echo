import { Schema, model } from "mongoose";

const subtaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Subtask = model("Subtask", subtaskSchema);

export default Subtask;

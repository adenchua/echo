import { Schema, model } from "mongoose";

export interface ISubtask {
  title: string;
  isCompleted: boolean;
}

const subtaskSchema = new Schema<ISubtask>(
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
  { versionKey: false },
);

const Subtask = model("Subtask", subtaskSchema);

export default Subtask;

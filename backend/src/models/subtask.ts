import { Schema, Types, model } from "mongoose";

export interface ISubtask {
  projectId: Types.ObjectId;
  title: string;
  isCompleted: boolean;
}

const subtaskSchema = new Schema<ISubtask>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      immutable: true,
    },
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

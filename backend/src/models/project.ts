import { Schema, Types, model } from "mongoose";

export interface IProject {
  title: string;
  type: string;
  description: string;
  announcement: string;
  adminIds: Types.ObjectId[];
  memberIds: Types.ObjectId[];
  createdDate: Date;
  epicIds: Types.ObjectId[];
  backlogIds: Types.ObjectId[];
  sprintIds: Types.ObjectId[];
  picture: number;
  isDeleted: boolean;
}

const projectSchema = new Schema<IProject>(
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
      ref: "Ticket",
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
  { versionKey: false },
);

const Project = model("Project", projectSchema);

export default Project;

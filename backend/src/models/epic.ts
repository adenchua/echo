import { Schema, model, Types } from "mongoose";

export interface IEpic {
  projectId: Types.ObjectId;
  title: string;
  description: string;
  ticketIds: Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  createdDate: Date;
}

const epicSchema = new Schema<IEpic>(
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
    description: {
      type: String,
      trim: true,
    },
    ticketIds: {
      type: [Schema.Types.ObjectId],
      ref: "Ticket",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

const Epic = model("Epic", epicSchema);

export default Epic;

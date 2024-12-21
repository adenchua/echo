import { Schema, Types, model } from "mongoose";

export interface ISprint {
  number: number;
  startDate: Date;
  endDate: Date;
  incompleteTicketIds: Types.ObjectId[];
  completedTicketIds: Types.ObjectId[];
  hasEnded: boolean;
}

const sprintSchema = new Schema<ISprint>(
  {
    number: {
      type: Number,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    incompleteTicketIds: {
      type: [Schema.Types.ObjectId],
      ref: "Ticket",
    },
    completedTicketIds: {
      type: [Schema.Types.ObjectId],
      ref: "Ticket",
    },
    hasEnded: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
);

const Sprint = model("Sprint", sprintSchema);

export default Sprint;

import { Schema, model } from "mongoose";

const sprintSchema = new Schema(
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

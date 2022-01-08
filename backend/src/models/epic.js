const mongoose = require("mongoose");
const { Schema } = mongoose;

const epicSchema = new Schema(
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
  { versionKey: false }
);

const Epic = mongoose.model("Epic", epicSchema);

module.exports = Epic;

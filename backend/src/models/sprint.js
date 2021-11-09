const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    incompleteStoryIds: {
      type: [Schema.Types.ObjectId],
      ref: "Story",
    },
    completedStoryIds: {
      type: [Schema.Types.ObjectId],
      ref: "Story",
    },
    hasEnded: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const epicSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    stories: {
      type: [Schema.Types.ObjectId],
      ref: "Story",
    },
    description: {
      type: String,
      trim: true,
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

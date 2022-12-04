const mongoose = require("mongoose");

const recyleSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("recycle", recyleSchema);

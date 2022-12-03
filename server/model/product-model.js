const mongoose = require("mongoose");

const prodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    manufacture: {
      type: String,
    },
    image_url: {
      type: String,
    },
    count: {
      type: Number,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("prod", prodSchema);

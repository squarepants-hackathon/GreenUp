const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "prod" }],
    totalWaste: {
      type: Number,
      default: 0,
    },
    recycledWaste: [{ type: mongoose.Schema.Types.ObjectId, ref: "recycle" }],
    wasteType: {
      medical: {
        type: Number,
        default: 0,
      },
      ewaste: {
        type: Number,
        default: 0,
      },
      plastic: {
        type: Number,
        default: 0,
      },
      paper: {
        type: Number,
        default: 0,
      },
      metal: {
        type: Number,
        default: 0,
      },
      glass: {
        type: Number,
        default: 0,
      },
      cardboard: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);

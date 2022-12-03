const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "prod" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
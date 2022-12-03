const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'prod' }],
    totalWaste: {
      type: Number,
      default: 0,
    },
    wasteType: {
      pet: {
        type: Number,
        default: 0,
      },
      hdpe: {
        type: Number,
        default: 0,
      },
      pvc: {
        type: Number,
        default: 0,
      },
      ldpc: {
        type: Number,
        default: 0,
      },
      pp: {
        type: Number,
        default: 0,
      },
      ps: {
        type: Number,
        default: 0,
      },
      other: {
        type: Number,
        default: 0,
      },
    },
    RecycledWaste: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users', userSchema);

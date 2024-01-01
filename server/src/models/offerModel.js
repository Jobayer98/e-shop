const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    offerName: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      defalt: Date.now(),
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Offer', offerSchema);

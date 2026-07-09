const mongoose = require('mongoose');

const shippingRateSchema = new mongoose.Schema(
  {
    city: { type: String, required: true, unique: true, trim: true },
    cost: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ShippingRate', shippingRateSchema);
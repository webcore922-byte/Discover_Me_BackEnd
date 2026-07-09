const mongoose = require('mongoose');
const shippingRateSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});
shippingRateSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
module.exports = mongoose.model('ShippingRate', shippingRateSchema);

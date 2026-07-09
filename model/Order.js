const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  _id: false
});
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['instapay', 'wallet', 'cash'],
    required: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  shippingCost: {
    type: Number,
    required: true
  },
  items: {
    type: [orderItemSchema],
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userEmail: {
    type: String,
    lowercase: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveredAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});
orderSchema.index({
  deliveredAt: 1
}, {
  expireAfterSeconds: 10 * 24 * 60 * 60
});
orderSchema.index({
  userEmail: 1
});
orderSchema.index({
  status: 1
});
orderSchema.index({
  createdAt: -1
});
orderSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true }, // نسخة من الاسم وقت الطلب
    price: { type: Number, required: true },
    count: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    paymentMethod: {
      type: String,
      enum: ['instapay', 'wallet', 'cash'],
      required: true,
    },
    city: { type: String, required: true, trim: true },
    shippingCost: { type: Number, required: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userEmail: { type: String, lowercase: true, trim: true },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'on_the_way', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
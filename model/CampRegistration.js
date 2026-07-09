const mongoose = require('mongoose');

const campRegistrationSchema = new mongoose.Schema(
  {
    camp: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Camp',
      required: true,
    },
    campTitle: { type: String, trim: true }, // نسخة احتياطية من الاسم وقت التسجيل
    playerName: { type: String, required: true, trim: true },
    playerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    playerPhone: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    registeredAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CampRegistration', campRegistrationSchema);
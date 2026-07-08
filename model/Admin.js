const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        'super_admin',
        'technical_coach',
        'camps_manager',
        'marketing_admin',
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
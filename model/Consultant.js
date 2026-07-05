const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    specialty: { type: String, trim: true },
    bio: { type: String, trim: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Consultant', consultantSchema);
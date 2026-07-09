const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    info: { type: String, trim: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coach', coachSchema);
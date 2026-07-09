const mongoose = require('mongoose');
const coachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  info: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});
coachSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
module.exports = mongoose.model('Coach', coachSchema);

const mongoose = require('mongoose');
const campCoachSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  }
}, {
  _id: false
});
const campSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  schedule: {
    type: String,
    trim: true
  },
  details: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  focus: {
    type: [String],
    default: []
  },
  coach: {
    type: campCoachSchema,
    default: () => ({})
  }
}, {
  timestamps: true
});
campSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
module.exports = mongoose.model('Camp', campSchema);

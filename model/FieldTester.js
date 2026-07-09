const mongoose = require('mongoose');
const fieldTesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});
fieldTesterSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
module.exports = mongoose.model('FieldTester', fieldTesterSchema);

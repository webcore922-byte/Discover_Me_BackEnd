const mongoose = require('mongoose');
const prizesSchema = new mongoose.Schema({
  first: {
    type: String,
    default: ''
  },
  second: {
    type: String,
    default: ''
  },
  grand: {
    type: String,
    default: ''
  },
  others: {
    type: String,
    default: ''
  }
}, {
  _id: false
});
const leaderboardEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: String,
    default: '0'
  }
}, {
  _id: false
});
const contestSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['normal', 'annual', 'monthly'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  goal: {
    type: String,
    trim: true
  },
  prizes: {
    type: prizesSchema,
    default: () => ({})
  },
  location: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  },
  leaderboard: {
    type: [leaderboardEntrySchema],
    default: []
  }
}, {
  timestamps: true
});
contestSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
module.exports = mongoose.model('Contest', contestSchema);

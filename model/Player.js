const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema(
  {
    pace: { type: Number, min: 0, max: 10, default: 0 },
    shooting: { type: Number, min: 0, max: 10, default: 0 },
    passing: { type: Number, min: 0, max: 10, default: 0 },
    dribbling: { type: Number, min: 0, max: 10, default: 0 },
    defending: { type: Number, min: 0, max: 10, default: 0 },
    physical: { type: Number, min: 0, max: 10, default: 0 },
  },
  { _id: false }
);

const fieldTestSchema = new mongoose.Schema(
  {
    date: { type: String, default: '' },
    time: { type: String, default: '' },
    location: { type: String, default: '' },
    coachName: { type: String, default: '' },
    isDone: { type: Boolean, default: false },
    finalStatus: {
      type: String,
      enum: ['', 'accepted', 'rejected'],
      default: '',
    },
  },
  { _id: false }
);

const playerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    nationalId: { type: String, trim: true },
    position: { type: String, trim: true },
    age: { type: Number },
    location: { type: String, trim: true },
    height: { type: Number },
    weight: { type: Number },
    preferredFoot: {
      type: String,
      enum: ['يمين', 'يسار', 'أشول'],
    },
    currentClub: { type: String, default: 'لاعب حر' },
    videoUrl: { type: String, default: '' },
    rating: { type: Number, default: 0, min: 0, max: 10 },
    status: {
      type: String,
      enum: ['pending','rejected', 'approved', 'final_accepted', 'final_rejected'],
      default: 'pending',
    },
    tags: { type: [String], default: [] },
    skills: { type: skillsSchema, default: () => ({}) },
    rejectionReason: { type: String, default: '' },
    fieldTest: { type: fieldTestSchema, default: () => ({}) },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
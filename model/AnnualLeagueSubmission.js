const mongoose = require('mongoose');

const userSkillsSchema = new mongoose.Schema(
  {
    pace: { type: Number, default: 0 },
    shooting: { type: Number, default: 0 },
    passing: { type: Number, default: 0 },
    dribbling: { type: Number, default: 0 },
    defending: { type: Number, default: 0 },
    physical: { type: Number, default: 0 },
  },
  { _id: false }
);

const annualLeagueSubmissionSchema = new mongoose.Schema(
  {
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contest',
      required: true,
    },
    leagueTitle: { type: String, trim: true },
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    userName: { type: String, required: true, trim: true },
    userAge: { type: Number },
    userLocation: { type: String, trim: true },
    userRate: { type: Number, default: 0 },
    userSkills: { type: userSkillsSchema, default: () => ({}) },
    userVideo: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'won', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'AnnualLeagueSubmission',
  annualLeagueSubmissionSchema
);
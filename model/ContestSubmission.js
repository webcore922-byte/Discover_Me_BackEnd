const mongoose = require('mongoose');
const awardedPrizeSchema = new mongoose.Schema({
  key: {
    type: String
  },
  label: {
    type: String
  },
  value: {
    type: String
  }
}, {
  _id: false
});
const contestSubmissionSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  contest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
    required: true
  },
  contestTitle: {
    type: String,
    trim: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'won', 'rejected'],
    default: 'pending'
  },
  isDoneAll: {
    type: Boolean,
    default: false
  },
  awardedPrize: {
    type: awardedPrizeSchema,
    default: null
  }
}, {
  timestamps: true
});
contestSubmissionSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});
module.exports = mongoose.model('ContestSubmission', contestSubmissionSchema);

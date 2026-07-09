const ContestSubmission = require('../../model/ContestSubmission');
const sendContestSubmissionEmail = require('./sendContestSubmissionEmail');
const updateContestSubmission = async (req, res, next) => {
  try {
    const before = await ContestSubmission.findById(req.params.id);
    if (!before) return res.status(404).json({
      message: 'المشاركة غير موجودة'
    });
    const submission = await ContestSubmission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!submission) return res.status(404).json({
      message: 'المشاركة غير موجودة'
    });
    const statusChanged = req.body.status && req.body.status !== before.status;
    if (statusChanged && (req.body.status === 'won' || req.body.status === 'rejected')) {
      sendContestSubmissionEmail(submission, req.body.status);
    }
    res.status(200).json(submission);
  } catch (error) {
    next(error);
  }
};
module.exports = updateContestSubmission;

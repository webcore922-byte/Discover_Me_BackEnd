const AnnualLeagueSubmission = require('../../model/AnnualLeagueSubmission');
const sendAnnualLeagueEmail = require('./sendAnnualLeagueEmail');
const updateSubmission = async (req, res, next) => {
  try {
    const before = await AnnualLeagueSubmission.findById(req.params.id);
    if (!before) return res.status(404).json({
      message: 'المشاركة غير موجودة'
    });
    const submission = await AnnualLeagueSubmission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!submission) return res.status(404).json({
      message: 'المشاركة غير موجودة'
    });
    const statusChanged = req.body.status && req.body.status !== before.status;
    if (statusChanged && (req.body.status === 'won' || req.body.status === 'rejected')) {
      sendAnnualLeagueEmail(submission, req.body.status);
    }
    res.status(200).json(submission);
  } catch (error) {
    next(error);
  }
};
module.exports = updateSubmission;

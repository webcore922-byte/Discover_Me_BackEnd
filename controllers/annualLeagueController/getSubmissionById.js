const AnnualLeagueSubmission = require('../../model/AnnualLeagueSubmission');
const getSubmissionById = async (req, res, next) => {
  try {
    const submission = await AnnualLeagueSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({
      message: 'المشاركة غير موجودة'
    });
    res.status(200).json(submission);
  } catch (error) {
    next(error);
  }
};
module.exports = getSubmissionById;

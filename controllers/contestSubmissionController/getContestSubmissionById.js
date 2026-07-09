const ContestSubmission = require('../../model/ContestSubmission');
const getContestSubmissionById = async (req, res, next) => {
  try {
    const submission = await ContestSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({
      message: 'المشاركة غير موجودة'
    });
    res.status(200).json(submission);
  } catch (error) {
    next(error);
  }
};
module.exports = getContestSubmissionById;

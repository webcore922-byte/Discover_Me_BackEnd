const ContestSubmission = require('../../model/ContestSubmission');
const deleteContestSubmission = async (req, res, next) => {
  try {
    const submission = await ContestSubmission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({
      message: 'المشاركة غير موجودة'
    });
    res.status(200).json({
      message: 'تم الحذف بنجاح'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteContestSubmission;

const AnnualLeagueSubmission = require('../../model/AnnualLeagueSubmission');
const deleteSubmission = async (req, res, next) => {
  try {
    const submission = await AnnualLeagueSubmission.findByIdAndDelete(req.params.id);
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
module.exports = deleteSubmission;

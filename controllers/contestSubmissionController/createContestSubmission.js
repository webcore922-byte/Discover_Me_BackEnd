const ContestSubmission = require('../../model/ContestSubmission');
const Contest = require('../../model/Contest');
const createContestSubmission = async (req, res, next) => {
  try {
    const {
      userName,
      userEmail,
      contest,
      videoUrl
    } = req.body;
    if (!userName || !userEmail || !contest || !videoUrl) {
      return res.status(400).json({
        message: 'من فضلك ادخل كل البيانات المطلوبة'
      });
    }
    const contestDoc = await Contest.findById(contest);
    if (!contestDoc) return res.status(404).json({
      message: 'المسابقة غير موجودة'
    });
    const submission = await ContestSubmission.create({
      userName,
      userEmail: userEmail.toLowerCase().trim(),
      contest,
      contestTitle: contestDoc.title,
      videoUrl
    });
    res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
};
module.exports = createContestSubmission;

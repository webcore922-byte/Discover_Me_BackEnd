const ContestSubmission = require('../../model/ContestSubmission');
const getAllContestSubmissions = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.userEmail) filter.userEmail = req.query.userEmail.toLowerCase().trim();
    if (req.query.contest) filter.contest = req.query.contest;
    const submissions = await ContestSubmission.find(filter).sort({
      createdAt: -1
    });
    res.status(200).json(submissions);
  } catch (error) {
    next(error);
  }
};
module.exports = getAllContestSubmissions;

const AnnualLeagueSubmission = require('../../model/AnnualLeagueSubmission');
const getAllSubmissions = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.userEmail) filter.userEmail = req.query.userEmail.toLowerCase().trim();
    if (req.query.league) filter.league = req.query.league;
    const submissions = await AnnualLeagueSubmission.find(filter).sort({
      createdAt: -1
    });
    res.status(200).json(submissions);
  } catch (error) {
    next(error);
  }
};
module.exports = getAllSubmissions;

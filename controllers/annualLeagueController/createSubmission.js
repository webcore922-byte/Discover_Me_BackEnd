const AnnualLeagueSubmission = require("../../model/AnnualLeagueSubmission");
const Contest = require("../../model/Contest");
const createSubmission = async (req, res, next) => {
  try {
    const { league, userEmail, userName, userVideo } = req.body;
    if (!league || !userEmail || !userName || !userVideo) {
      return res.status(400).json({
        message: "من فضلك ادخل كل البيانات المطلوبة",
      });
    }
    const leagueDoc = await Contest.findById(league);
    if (!leagueDoc)
      return res.status(404).json({
        message: "الدوري غير موجود",
      });
    const submission = await AnnualLeagueSubmission.create({
      ...req.body,
      userEmail: userEmail.toLowerCase().trim(),
      leagueTitle: leagueDoc.title,
    });
    res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
};
module.exports = createSubmission;

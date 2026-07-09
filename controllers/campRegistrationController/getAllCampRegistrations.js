const CampRegistration = require("../../model/CampRegistration");
const getAllCampRegistrations = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.playerEmail) {
      filter.playerEmail = req.query.playerEmail.toLowerCase().trim();
    }
    const registrations = await CampRegistration.find(filter).sort({
      createdAt: -1,
    });
    res.status(200).json(registrations);
  } catch (error) {
    next(error);
  }
};
module.exports = getAllCampRegistrations;

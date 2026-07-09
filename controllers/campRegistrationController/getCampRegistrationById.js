const CampRegistration = require("../../model/CampRegistration");
const getCampRegistrationById = async (req, res, next) => {
  try {
    const registration = await CampRegistration.findById(req.params.id);
    if (!registration)
      return res.status(404).json({
        message: "التسجيل غير موجود",
      });
    res.status(200).json(registration);
  } catch (error) {
    next(error);
  }
};
module.exports = getCampRegistrationById;

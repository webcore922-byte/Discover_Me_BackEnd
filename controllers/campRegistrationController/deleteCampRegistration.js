const CampRegistration = require("../../model/CampRegistration");
const deleteCampRegistration = async (req, res, next) => {
  try {
    const registration = await CampRegistration.findByIdAndDelete(
      req.params.id,
    );
    if (!registration)
      return res.status(404).json({
        message: "التسجيل غير موجود",
      });
    res.status(200).json({
      message: "تم الحذف بنجاح",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteCampRegistration;

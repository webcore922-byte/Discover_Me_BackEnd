const CampRegistration = require('../../model/CampRegistration');
const sendCampRegistrationEmail = require('./sendCampRegistrationEmail');
const updateCampRegistration = async (req, res, next) => {
  try {
    const before = await CampRegistration.findById(req.params.id);
    if (!before) return res.status(404).json({
      message: 'التسجيل غير موجود'
    });
    const registration = await CampRegistration.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!registration) return res.status(404).json({
      message: 'التسجيل غير موجود'
    });
    const statusChanged = req.body.status && req.body.status !== before.status;
    if (statusChanged && (req.body.status === 'accepted' || req.body.status === 'rejected')) {
      sendCampRegistrationEmail(registration, req.body.status);
    }
    res.status(200).json(registration);
  } catch (error) {
    next(error);
  }
};
module.exports = updateCampRegistration;

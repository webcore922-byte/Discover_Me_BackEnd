const CampRegistration = require('../../model/CampRegistration');
const Camp = require('../../model/Camp');
const createCampRegistration = async (req, res, next) => {
  try {
    const {
      camp,
      playerName,
      playerEmail,
      playerPhone
    } = req.body;
    if (!camp || !playerName || !playerEmail) {
      return res.status(400).json({
        message: 'من فضلك ادخل كل البيانات المطلوبة'
      });
    }
    const campDoc = await Camp.findById(camp);
    if (!campDoc) {
      return res.status(404).json({
        message: 'المعسكر غير موجود'
      });
    }
    const existing = await CampRegistration.findOne({
      camp,
      playerEmail: playerEmail.toLowerCase().trim(),
      status: {
        $in: ['pending', 'accepted']
      }
    });
    if (existing) {
      return res.status(409).json({
        message: 'أنت مسجل بالفعل في هذا المعسكر'
      });
    }
    const registration = await CampRegistration.create({
      camp,
      campTitle: campDoc.title,
      playerName,
      playerEmail: playerEmail.toLowerCase().trim(),
      playerPhone
    });
    res.status(201).json(registration);
  } catch (error) {
    next(error);
  }
};
module.exports = createCampRegistration;

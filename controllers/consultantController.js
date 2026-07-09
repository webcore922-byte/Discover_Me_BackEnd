const Consultant = require('../model/Consultant');
const getAllConsultants = async (req, res, next) => {
  try {
    const consultants = await Consultant.find();
    res.status(200).json(consultants);
  } catch (error) {
    next(error);
  }
};
const getConsultantById = async (req, res, next) => {
  try {
    const consultant = await Consultant.findById(req.params.id);
    if (!consultant) return res.status(404).json({
      message: 'المستشار غير موجود'
    });
    res.status(200).json(consultant);
  } catch (error) {
    next(error);
  }
};
const createConsultant = async (req, res, next) => {
  try {
    const consultant = await Consultant.create(req.body);
    res.status(201).json(consultant);
  } catch (error) {
    next(error);
  }
};
const updateConsultant = async (req, res, next) => {
  try {
    const consultant = await Consultant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!consultant) return res.status(404).json({
      message: 'المستشار غير موجود'
    });
    res.status(200).json(consultant);
  } catch (error) {
    next(error);
  }
};
const deleteConsultant = async (req, res, next) => {
  try {
    const consultant = await Consultant.findByIdAndDelete(req.params.id);
    if (!consultant) return res.status(404).json({
      message: 'المستشار غير موجود'
    });
    res.status(200).json({
      message: 'تم الحذف بنجاح'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllConsultants,
  getConsultantById,
  createConsultant,
  updateConsultant,
  deleteConsultant
};

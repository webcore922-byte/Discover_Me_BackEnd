const Camp = require('../model/Camp');
const getAllCamps = async (req, res, next) => {
  try {
    const camps = await Camp.find();
    res.status(200).json(camps);
  } catch (error) {
    next(error);
  }
};
const getCampById = async (req, res, next) => {
  try {
    const camp = await Camp.findById(req.params.id);
    if (!camp) return res.status(404).json({
      message: 'المعسكر غير موجود'
    });
    res.status(200).json(camp);
  } catch (error) {
    next(error);
  }
};
const createCamp = async (req, res, next) => {
  try {
    const camp = await Camp.create(req.body);
    res.status(201).json(camp);
  } catch (error) {
    next(error);
  }
};
const updateCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!camp) return res.status(404).json({
      message: 'المعسكر غير موجود'
    });
    res.status(200).json(camp);
  } catch (error) {
    next(error);
  }
};
const deleteCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findByIdAndDelete(req.params.id);
    if (!camp) return res.status(404).json({
      message: 'المعسكر غير موجود'
    });
    res.status(200).json({
      message: 'تم الحذف بنجاح'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllCamps,
  getCampById,
  createCamp,
  updateCamp,
  deleteCamp
};

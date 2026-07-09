const Coach = require("../model/Coach");
const getAllCoaches = async (req, res, next) => {
  try {
    const coaches = await Coach.find();
    res.status(200).json(coaches);
  } catch (error) {
    next(error);
  }
};
const getCoachById = async (req, res, next) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach)
      return res.status(404).json({
        message: "الكابتن غير موجود",
      });
    res.status(200).json(coach);
  } catch (error) {
    next(error);
  }
};
const createCoach = async (req, res, next) => {
  try {
    const coach = await Coach.create(req.body);
    res.status(201).json(coach);
  } catch (error) {
    next(error);
  }
};
const updateCoach = async (req, res, next) => {
  try {
    const coach = await Coach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!coach)
      return res.status(404).json({
        message: "الكابتن غير موجود",
      });
    res.status(200).json(coach);
  } catch (error) {
    next(error);
  }
};
const deleteCoach = async (req, res, next) => {
  try {
    const coach = await Coach.findByIdAndDelete(req.params.id);
    if (!coach)
      return res.status(404).json({
        message: "الكابتن غير موجود",
      });
    res.status(200).json({
      message: "تم الحذف بنجاح",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoach,
  deleteCoach,
};

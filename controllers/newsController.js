const News = require("../model/News");
const getAllNews = async (req, res, next) => {
  try {
    const news = await News.find().sort({
      createdAt: -1,
    });
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};
const getNewsById = async (req, res, next) => {
  try {
    const item = await News.findById(req.params.id);
    if (!item)
      return res.status(404).json({
        message: "الخبر غير موجود",
      });
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};
const createNews = async (req, res, next) => {
  try {
    const item = await News.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};
const updateNews = async (req, res, next) => {
  try {
    const item = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item)
      return res.status(404).json({
        message: "الخبر غير موجود",
      });
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};
const deleteNews = async (req, res, next) => {
  try {
    const item = await News.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({
        message: "الخبر غير موجود",
      });
    res.status(200).json({
      message: "تم الحذف بنجاح",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};

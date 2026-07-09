const Contest = require('../model/Contest');
const getAllContests = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const contests = await Contest.find(filter);
    res.status(200).json(contests);
  } catch (error) {
    next(error);
  }
};
const getContestById = async (req, res, next) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) return res.status(404).json({
      message: 'المسابقة غير موجودة'
    });
    res.status(200).json(contest);
  } catch (error) {
    next(error);
  }
};
const createContest = async (req, res, next) => {
  try {
    const contest = await Contest.create(req.body);
    res.status(201).json(contest);
  } catch (error) {
    next(error);
  }
};
const updateContest = async (req, res, next) => {
  try {
    const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!contest) return res.status(404).json({
      message: 'المسابقة غير موجودة'
    });
    res.status(200).json(contest);
  } catch (error) {
    next(error);
  }
};
const deleteContest = async (req, res, next) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) return res.status(404).json({
      message: 'المسابقة غير موجودة'
    });
    res.status(200).json({
      message: 'تم الحذف بنجاح'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContests,
  getContestById,
  createContest,
  updateContest,
  deleteContest
};

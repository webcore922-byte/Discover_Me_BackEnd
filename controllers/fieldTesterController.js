const FieldTester = require('../model/FieldTester');
const getAllFieldTesters = async (req, res, next) => {
  try {
    const testers = await FieldTester.find();
    res.status(200).json(testers);
  } catch (error) {
    next(error);
  }
};
const getFieldTesterById = async (req, res, next) => {
  try {
    const tester = await FieldTester.findById(req.params.id);
    if (!tester) return res.status(404).json({
      message: 'محكّم الاختبار غير موجود'
    });
    res.status(200).json(tester);
  } catch (error) {
    next(error);
  }
};
const createFieldTester = async (req, res, next) => {
  try {
    const tester = await FieldTester.create(req.body);
    res.status(201).json(tester);
  } catch (error) {
    next(error);
  }
};
const updateFieldTester = async (req, res, next) => {
  try {
    const tester = await FieldTester.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tester) return res.status(404).json({
      message: 'محكّم الاختبار غير موجود'
    });
    res.status(200).json(tester);
  } catch (error) {
    next(error);
  }
};
const deleteFieldTester = async (req, res, next) => {
  try {
    const tester = await FieldTester.findByIdAndDelete(req.params.id);
    if (!tester) return res.status(404).json({
      message: 'محكّم الاختبار غير موجود'
    });
    res.status(200).json({
      message: 'تم الحذف بنجاح'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllFieldTesters,
  getFieldTesterById,
  createFieldTester,
  updateFieldTester,
  deleteFieldTester
};

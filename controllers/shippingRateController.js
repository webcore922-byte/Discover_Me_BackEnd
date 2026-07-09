const ShippingRate = require('../model/ShippingRate');
const getAllShippingRates = async (req, res, next) => {
  try {
    const rates = await ShippingRate.find();
    res.status(200).json(rates);
  } catch (error) {
    next(error);
  }
};
const getShippingRateById = async (req, res, next) => {
  try {
    const rate = await ShippingRate.findById(req.params.id);
    if (!rate) return res.status(404).json({
      message: 'سعر الشحن غير موجود'
    });
    res.status(200).json(rate);
  } catch (error) {
    next(error);
  }
};
const createShippingRate = async (req, res, next) => {
  try {
    const rate = await ShippingRate.create(req.body);
    res.status(201).json(rate);
  } catch (error) {
    next(error);
  }
};
const updateShippingRate = async (req, res, next) => {
  try {
    const rate = await ShippingRate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!rate) return res.status(404).json({
      message: 'سعر الشحن غير موجود'
    });
    res.status(200).json(rate);
  } catch (error) {
    next(error);
  }
};
const deleteShippingRate = async (req, res, next) => {
  try {
    const rate = await ShippingRate.findByIdAndDelete(req.params.id);
    if (!rate) return res.status(404).json({
      message: 'سعر الشحن غير موجود'
    });
    res.status(200).json({
      message: 'تم الحذف بنجاح'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllShippingRates,
  getShippingRateById,
  createShippingRate,
  updateShippingRate,
  deleteShippingRate
};

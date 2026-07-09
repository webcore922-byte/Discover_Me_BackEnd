const Order = require('../../model/Order');
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({
      message: 'الطلب غير موجود'
    });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
module.exports = getOrderById;

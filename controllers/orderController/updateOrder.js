const Order = require('../../model/Order');
const sendOrderStatusEmail = require('./sendOrderStatusEmail');
const updateOrder = async (req, res, next) => {
  try {
    const updateData = {
      ...req.body
    };
    const existing = updateData.status ? await Order.findById(req.params.id) : null;
    if (updateData.status === 'delivered') {
      if (existing && !existing.deliveredAt) {
        updateData.deliveredAt = new Date();
      }
    } else if (updateData.status) {
      updateData.deliveredAt = null;
    }
    const order = await Order.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });
    if (!order) return res.status(404).json({
      message: 'الطلب غير موجود'
    });
    if (updateData.status && updateData.status !== existing?.status) {
      sendOrderStatusEmail(order, updateData.status);
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
module.exports = updateOrder;

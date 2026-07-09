const Order = require('../../model/Order');
const getAllOrders = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.userEmail) {
      filter.userEmail = req.query.userEmail.toLowerCase().trim();
    }
    const orders = await Order.find(filter).sort({
      createdAt: -1
    });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
module.exports = getAllOrders;

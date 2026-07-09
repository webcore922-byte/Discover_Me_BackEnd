const {
  formatCart,
  getOrCreateCart
} = require('./helpers');
const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    await cart.populate('items.product');
    res.status(200).json(formatCart(cart));
  } catch (error) {
    next(error);
  }
};
module.exports = getCart;

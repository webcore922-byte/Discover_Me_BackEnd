const {
  formatCart,
  getOrCreateCart
} = require('./helpers');
const clearCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.status(200).json(formatCart(cart));
  } catch (error) {
    next(error);
  }
};
module.exports = clearCart;

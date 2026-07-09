const {
  formatCart,
  getOrCreateCart
} = require('./helpers');
const removeItem = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
    await cart.save();
    await cart.populate('items.product');
    res.status(200).json(formatCart(cart));
  } catch (error) {
    next(error);
  }
};
module.exports = removeItem;

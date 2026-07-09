const {
  formatCart,
  getOrCreateCart
} = require('./helpers');
const updateItem = async (req, res, next) => {
  try {
    const {
      count
    } = req.body;
    if (!count || Number(count) < 1) {
      return res.status(400).json({
        message: 'العدد لازم يكون رقم أكبر من صفر'
      });
    }
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find(i => i.product.toString() === req.params.productId);
    if (!item) {
      return res.status(404).json({
        message: 'المنتج غير موجود في السلة'
      });
    }
    item.count = Number(count);
    await cart.save();
    await cart.populate('items.product');
    res.status(200).json(formatCart(cart));
  } catch (error) {
    next(error);
  }
};
module.exports = updateItem;

const {
  formatCart,
  getOrCreateCart
} = require('./helpers');
const addItem = async (req, res, next) => {
  try {
    const {
      productId,
      count
    } = req.body;
    if (!productId) {
      return res.status(400).json({
        message: 'من فضلك حدد المنتج'
      });
    }
    const addCount = Number(count) > 0 ? Number(count) : 1;
    const cart = await getOrCreateCart(req.user._id);
    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.count += addCount;
    } else {
      cart.items.push({
        product: productId,
        count: addCount
      });
    }
    await cart.save();
    await cart.populate('items.product');
    res.status(200).json(formatCart(cart));
  } catch (error) {
    next(error);
  }
};
module.exports = addItem;

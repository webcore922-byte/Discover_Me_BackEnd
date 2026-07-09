const Cart = require('../../model/Cart');
const formatCart = cart => {
  if (!cart) return {
    items: []
  };
  const items = cart.items.filter(item => item.product).map(item => ({
    id: item.product._id,
    name: item.product.name,
    price: item.product.price,
    discount: item.product.discount,
    image: item.product.image,
    category: item.product.category,
    count: item.count
  }));
  return {
    id: cart._id,
    items
  };
};
const getOrCreateCart = async userId => {
  let cart = await Cart.findOne({
    user: userId
  });
  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: []
    });
  }
  return cart;
};
module.exports = {
  formatCart,
  getOrCreateCart
};

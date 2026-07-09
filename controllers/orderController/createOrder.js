const Order = require('../../model/Order');
const Product = require('../../model/Product');
const Cart = require('../../model/Cart');
const {
  recomputeBestSellers
} = require('../../utils/bestSellers');
const sendOrderStatusEmail = require('./sendOrderStatusEmail');
const createOrder = async (req, res, next) => {
  try {
    const {
      name,
      phone,
      address,
      paymentMethod,
      city,
      shippingCost,
      items,
      subtotal,
      total
    } = req.body;
    if (!name || !phone || !address || !paymentMethod || !city || !items?.length) {
      return res.status(400).json({
        message: 'من فضلك ادخل كل البيانات المطلوبة'
      });
    }
    const mappedItems = items.map(item => ({
      product: item.product || item.id,
      name: item.name,
      price: item.price,
      count: item.count
    }));
    const order = await Order.create({
      name,
      phone,
      address,
      paymentMethod,
      city,
      shippingCost,
      items: mappedItems,
      subtotal,
      total,
      userEmail: req.user?.email ? req.user.email.toLowerCase().trim() : undefined,
      user: req.userType === 'user' ? req.user?._id : undefined
    });
    if (req.userType === 'user' && req.user?._id) {
      try {
        await Cart.findOneAndUpdate({
          user: req.user._id
        }, {
          items: []
        });
      } catch (clearCartErr) {
        console.error('Error clearing cart after order:', clearCartErr);
      }
    }
    sendOrderStatusEmail(order, 'pending');
    res.status(201).json(order);
    (async () => {
      try {
        if (mappedItems.length) {
          const ops = mappedItems.map(item => ({
            updateOne: {
              filter: {
                _id: item.product
              },
              update: {
                $inc: {
                  salesCount: item.count
                }
              }
            }
          }));
          await Product.bulkWrite(ops);
        }
        await recomputeBestSellers();
      } catch (bestSellerErr) {
        console.error('Error updating salesCount/bestSellers:', bestSellerErr);
      }
    })();
  } catch (error) {
    next(error);
  }
};
module.exports = createOrder;

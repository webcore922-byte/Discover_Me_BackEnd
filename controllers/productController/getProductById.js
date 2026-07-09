const Product = require('../../model/Product');
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({
      message: 'المنتج غير موجود'
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
module.exports = getProductById;

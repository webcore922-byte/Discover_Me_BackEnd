const Product = require('../../model/Product');
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({
      message: 'المنتج غير موجود'
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
module.exports = updateProduct;

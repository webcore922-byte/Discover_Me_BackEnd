const Product = require('../../model/Product');
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({
      message: 'المنتج غير موجود'
    });
    res.status(200).json({
      message: 'تم الحذف بنجاح'
    });
  } catch (error) {
    next(error);
  }
};
module.exports = deleteProduct;

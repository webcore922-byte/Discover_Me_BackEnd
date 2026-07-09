const Product = require('../../model/Product');
const {
  recomputeBestSellers
} = require('../../utils/bestSellers');
const recomputeBestSellersHandler = async (req, res, next) => {
  try {
    await recomputeBestSellers();
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
module.exports = recomputeBestSellersHandler;

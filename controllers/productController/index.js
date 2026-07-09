const getAllProducts = require('./getAllProducts');
const getProductById = require('./getProductById');
const createProduct = require('./createProduct');
const updateProduct = require('./updateProduct');
const patchProduct = require('./patchProduct');
const deleteProduct = require('./deleteProduct');
const recomputeBestSellersHandler = require('./recomputeBestSellersHandler');
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
  recomputeBestSellersHandler
};

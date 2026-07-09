const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
  recomputeBestSellersHandler
} = require('../controllers/productController/productController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
const {
  upload,
  processImageUpload
} = require('../middleware/upload');
router.get('/', getAllProducts);
router.post('/recompute-best-sellers', protect, adminOnly(), recomputeBestSellersHandler);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly(), upload.single('image'), processImageUpload('products'), createProduct);
router.put('/:id', protect, adminOnly(), upload.single('image'), processImageUpload('products'), updateProduct);
router.patch('/:id', protect, adminOnly(), patchProduct);
router.delete('/:id', protect, adminOnly(), deleteProduct);
module.exports = router;
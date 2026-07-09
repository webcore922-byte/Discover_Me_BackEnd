const express = require('express');
const router = express.Router();
const {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart
} = require('../controllers/cartController');
const {
  protect
} = require('../middleware/auth');
router.get('/', protect, getCart);
router.post('/items', protect, addItem);
router.put('/items/:productId', protect, updateItem);
router.delete('/items/:productId', protect, removeItem);
router.delete('/', protect, clearCart);
module.exports = router;

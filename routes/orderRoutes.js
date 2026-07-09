const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.post('/', protect, createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', protect, adminOnly(), updateOrder);
router.patch('/:id', protect, adminOnly(), updateOrder);
router.delete('/:id', protect, adminOnly(), deleteOrder);
module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getAllShippingRates,
  getShippingRateById,
  createShippingRate,
  updateShippingRate,
  deleteShippingRate
} = require('../controllers/shippingRateController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.get('/', getAllShippingRates);
router.get('/:id', getShippingRateById);
router.post('/', protect, adminOnly(), createShippingRate);
router.put('/:id', protect, adminOnly(), updateShippingRate);
router.delete('/:id', protect, adminOnly(), deleteShippingRate);
module.exports = router;
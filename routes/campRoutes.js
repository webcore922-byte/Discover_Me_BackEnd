const express = require('express');
const router = express.Router();
const {
  getAllCamps,
  getCampById,
  createCamp,
  updateCamp,
  deleteCamp
} = require('../controllers/campController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.get('/', getAllCamps);
router.get('/:id', getCampById);
router.post('/', protect, adminOnly(), createCamp);
router.put('/:id', protect, adminOnly(), updateCamp);
router.delete('/:id', protect, adminOnly(), deleteCamp);
module.exports = router;

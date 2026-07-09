const express = require('express');
const router = express.Router();
const {
  getAllConsultants,
  getConsultantById,
  createConsultant,
  updateConsultant,
  deleteConsultant
} = require('../controllers/consultantController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.get('/', getAllConsultants);
router.get('/:id', getConsultantById);
router.post('/', protect, adminOnly(), createConsultant);
router.put('/:id', protect, adminOnly(), updateConsultant);
router.delete('/:id', protect, adminOnly(), deleteConsultant);
module.exports = router;

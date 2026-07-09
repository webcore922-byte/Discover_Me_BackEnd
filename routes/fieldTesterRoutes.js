const express = require('express');
const router = express.Router();
const {
  getAllFieldTesters,
  getFieldTesterById,
  createFieldTester,
  updateFieldTester,
  deleteFieldTester
} = require('../controllers/fieldTesterController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.get('/', getAllFieldTesters);
router.get('/:id', getFieldTesterById);
router.post('/', protect, adminOnly(), createFieldTester);
router.put('/:id', protect, adminOnly(), updateFieldTester);
router.delete('/:id', protect, adminOnly(), deleteFieldTester);
module.exports = router;

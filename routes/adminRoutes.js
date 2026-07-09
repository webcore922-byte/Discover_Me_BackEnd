const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  createAdmin,
  getAllAdmins
} = require('../controllers/adminController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.post('/login', loginAdmin);
router.get('/', protect, adminOnly('super_admin'), getAllAdmins);
router.post('/', protect, adminOnly('super_admin'), createAdmin);
module.exports = router;

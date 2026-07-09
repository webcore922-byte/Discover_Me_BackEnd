const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getMe,
  updateUser,
  forgotPassword,
  resetPassword
} = require('../controllers/userController');
const {
  protect
} = require('../middleware/auth');
const {
  upload,
  processImageUpload
} = require('../middleware/upload');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);
router.put('/:id', protect, upload.single('image'), processImageUpload('users'), updateUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
module.exports = router;

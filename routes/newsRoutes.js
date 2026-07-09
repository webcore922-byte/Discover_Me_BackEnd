const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
const {
  upload,
  processImageUpload
} = require('../middleware/upload');
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', protect, adminOnly(), upload.single('image'), processImageUpload('news'), createNews);
router.put('/:id', protect, adminOnly(), upload.single('image'), processImageUpload('news'), updateNews);
router.delete('/:id', protect, adminOnly(), deleteNews);
module.exports = router;

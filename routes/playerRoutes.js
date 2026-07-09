const express = require('express');
const router = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
} = require('../controllers/playerController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
const {
  upload,
  processImageUpload
} = require('../middleware/upload');
router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);
router.post('/', upload.single('image'), processImageUpload('players'), createPlayer);
router.put('/:id', upload.single('image'), processImageUpload('players'), updatePlayer);
router.patch('/:id', upload.single('image'), processImageUpload('players'), updatePlayer);
router.delete('/:id', deletePlayer);
module.exports = router;

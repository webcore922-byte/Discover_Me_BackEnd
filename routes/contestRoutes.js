const express = require('express');
const router = express.Router();
const {
  getAllContests,
  getContestById,
  createContest,
  updateContest,
  deleteContest
} = require('../controllers/contestController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.get('/', getAllContests);
router.get('/:id', getContestById);
router.post('/', protect, adminOnly(), createContest);
router.put('/:id', protect, adminOnly(), updateContest);
router.delete('/:id', protect, adminOnly(), deleteContest);
module.exports = router;

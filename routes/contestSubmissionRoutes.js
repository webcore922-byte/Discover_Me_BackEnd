const express = require('express');
const router = express.Router();
const {
  getAllContestSubmissions,
  getContestSubmissionById,
  createContestSubmission,
  updateContestSubmission,
  deleteContestSubmission
} = require('../controllers/contestSubmissionController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.get('/', getAllContestSubmissions);
router.get('/:id', getContestSubmissionById);
router.post('/', createContestSubmission);
router.put('/:id', protect, adminOnly(), updateContestSubmission);
router.patch('/:id', protect, adminOnly(), updateContestSubmission);
router.delete('/:id', protect, adminOnly(), deleteContestSubmission);
module.exports = router;

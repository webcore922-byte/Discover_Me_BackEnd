const express = require('express');
const router = express.Router();
const {
  getAllCampRegistrations,
  getCampRegistrationById,
  createCampRegistration,
  updateCampRegistration,
  deleteCampRegistration
} = require('../controllers/campRegistrationController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.get('/', getAllCampRegistrations);
router.get('/:id', getCampRegistrationById);
router.post('/', createCampRegistration);
router.put('/:id', protect, adminOnly(), updateCampRegistration);
router.patch('/:id', protect, adminOnly(), updateCampRegistration);
router.delete('/:id', deleteCampRegistration);
module.exports = router;

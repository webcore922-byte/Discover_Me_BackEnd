const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact
} = require('../controllers/contactController');
const {
  protect,
  adminOnly
} = require('../middleware/auth');
router.post('/', createContact);
router.get('/', protect, adminOnly(), getAllContacts);
router.get('/:id', protect, adminOnly(), getContactById);
router.delete('/:id', protect, adminOnly(), deleteContact);
module.exports = router;

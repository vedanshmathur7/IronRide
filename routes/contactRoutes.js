const express = require('express');
const router = express.Router();
const {
    createContact,
    getAllContacts,
    updateContactStatus
} = require('../controllers/contactController');

router.post('/', createContact);
router.get('/', getAllContacts);
router.patch('/:id/status', updateContactStatus);

module.exports = router;
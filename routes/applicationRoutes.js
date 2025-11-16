const express = require('express');
const router = express.Router();
const {
    createApplication,
    getAllApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');

router.post('/', createApplication);
router.get('/', getAllApplications);
router.patch('/:id/status', updateApplicationStatus);

module.exports = router;
const express = require('express');
const router = express.Router();

const membershipController = require('../controllers/membership_controller');

router.get('/',membershipController.home);
router.get('/batch/all',membershipController.getAllMembers);
router.get('/batch/:batch',membershipController.getMembersByBatch);


module.exports = router;
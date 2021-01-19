const express = require('express');
const router = express.Router();

const membershipController = require('../controllers/membership_controller');

router.get('/',membershipController.home);



module.exports = router;
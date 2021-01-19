const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact_controller');

router.get('/',contactController.home);



module.exports = router;
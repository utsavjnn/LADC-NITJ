const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');

router.get('/',adminController.home);



module.exports = router;
const express = require('express');
const router = express.Router();

const newsletter_controller = require('../controllers/newsletter_controller');

router.get('/',newsletter_controller.home);



module.exports = router;
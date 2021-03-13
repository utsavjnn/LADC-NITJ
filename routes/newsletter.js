const express = require('express');
const router = express.Router();

const newsletter_controller = require('../controllers/newsletter_controller');


router.post('/subscribe',newsletter_controller.subscribe)




module.exports = router;
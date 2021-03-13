const express = require('express');
const router = express.Router();

const newsletter_controller = require('../controllers/newsletter_controller');


router.post('/subscribe',newsletter_controller.subscribe);

router.post('/unsubscribe',newsletter_controller.un_subscribe);


module.exports = router;
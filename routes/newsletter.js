const express = require('express');
const router = express.Router();

const newsletter_controller = require('../controllers/newsletter_controller');


router.post('/subscribe',newsletter_controller.subscribe)
router.get('/newsletter',newsletter_controller.home);
router.post('/postnewsletter',newsletter_controller.postnewsletter);



module.exports = router;
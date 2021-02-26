const express = require('express');
const router = express.Router();

const addeventsController = require('../controllers/addevent_controller');

router.get('/addevent',addeventsController.home);

router.post('/addevent',addeventsController.addEvent);


module.exports = router;
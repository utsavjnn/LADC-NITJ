const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events_controller');

router.get('/',eventsController.home);



module.exports = router;
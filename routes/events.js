const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events_controller');

router.get('/',eventsController.home);

router.get('/addevent',eventsController.getaddeventshome);
router.post('/addevent',eventsController.addEvent);


router.get('/editevent/:eventid',eventsController.getediteventshome);
router.post('/editevent',eventsController.editevent);


module.exports = router;
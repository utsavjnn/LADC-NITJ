const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events_controller');



router.get('/',eventsController.home);
router.get("/addevent",eventsController.addEventhome);
router.post('/addevent',eventsController.addEvent);
router.get('/editevent/:eventid',eventsController.editEventhome);
router.post('/editevent',eventsController.edit);
router.post('/deleteevent',eventsController.delete)



module.exports = router;
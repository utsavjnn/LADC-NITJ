const express = require('express');
const router = express.Router();

const editeventsController = require('../controllers/editevent_controller');

router.get('/editevent/:eventid',editeventsController.home);
router.post('/editevent',editeventsController.edit)



module.exports = router;
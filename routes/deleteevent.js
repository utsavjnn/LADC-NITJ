const express = require('express');
const router = express.Router();

const deleteeventsController = require('../controllers/deleteevent_controller');

router.post('/deleteevent',deleteeventsController.delete)



module.exports = router;
const express = require('express');
const router = express.Router();

const alumniController = require('../controllers/alumni_controller');

router.get('/',alumniController.home);



module.exports = router;
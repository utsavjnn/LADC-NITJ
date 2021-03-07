const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog_controller');

router.get('/',blogController.home);

router.post('/',blogController.addblog);


module.exports = router;
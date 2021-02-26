const express = require('express');
const router = express.Router();
const homepageController = require('../controllers/homepage_controller')

router.get('/',homepageController.homePage);
router.use('/about', require('./about'));
router.use('/admin', require('./admin'));
router.use('/events',require('./events'));
router.use('/membership',require('./membership'));
router.use('/alumni',require('./alumni'));
router.use('/blog',require('./blog'));
router.use('/contact',require('./contact'));
router.use(require('./newsletter'));
router.use(require('./addevent'));

module.exports = router;
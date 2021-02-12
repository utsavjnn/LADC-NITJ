const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');
router.get('/',adminController.home);
router.post('/sign-in',adminController.signIn);
router.post('/sign-up',adminController.signUp);



module.exports = router;
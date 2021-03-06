const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog_controller');

router.get('/',blogController.home);

router.post('/',blogController.addblog);

router.get('/blogs', blogController.getBlogs);

router.get('/checkAuth',blogController.checkAuth);

router.delete('/deleteBlog',blogController.deleteBlog)

module.exports = router;
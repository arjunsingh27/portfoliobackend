const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

router.post('/', blogsController.blogUpload);
router.get('/', blogsController.getAllBlogs);
router.get('/:id', blogsController.getOneBlog);

module.exports = router;

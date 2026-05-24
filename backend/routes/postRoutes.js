const express = require('express');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const { getComments, createComment } = require('../controllers/commentController');

router.get('/', protect, getPosts);
router.post('/', protect, createPost);

router.get('/:postId/comments', protect, getComments);
router.post('/:postId/comments', protect, createComment);

module.exports = router;

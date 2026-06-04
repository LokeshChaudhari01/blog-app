const express = require('express');
const router = express.Router();
const { getPosts, createPost, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const { getComments, createComment } = require('../controllers/commentController');

router.get('/', protect, getPosts);
router.post('/', protect, createPost);

// Single post operations
router.get('/:postId', protect, getPostById);
router.put('/:postId', protect, updatePost);
router.delete('/:postId', protect, deletePost);

router.get('/:postId/comments', protect, getComments);
router.post('/:postId/comments', protect, createComment);

module.exports = router;

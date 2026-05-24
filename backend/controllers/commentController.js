const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'email')
      .sort({ createdAt: 1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  try {
    if (!content) {
      return res.status(400).json({ message: 'Please provide comment content' });
    }

    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await Comment.create({
      content,
      author: req.user._id,
      post: postId,
    });

    const populatedComment = await Comment.findById(comment._id).populate('author', 'email');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

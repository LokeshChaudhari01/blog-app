const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'email').sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

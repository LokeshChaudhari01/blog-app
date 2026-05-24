const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blogcms');

const importData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const users = await User.insertMany([
      { email: 'user1@test.com', password },
      { email: 'user2@test.com', password },
      { email: 'user3@test.com', password },
      { email: 'user4@test.com', password },
    ]);

    console.log('Users created:', users.map(u => u.email));

    const posts = await Post.insertMany([
      {
        title: 'Getting Started with Next.js',
        content: 'Next.js is a powerful React framework that makes building full-stack applications a breeze...',
        author: users[0]._id
      },
      {
        title: 'Why I love Tailwind CSS',
        content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces...',
        author: users[1]._id
      },
      {
        title: 'Understanding MongoDB Aggregations',
        content: 'Aggregations in MongoDB are incredibly powerful but can be daunting at first. Let\'s break them down...',
        author: users[2]._id
      },
      {
        title: 'React Server Components Explained',
        content: 'React Server Components are a new addition to React that allow you to render components on the server...',
        author: users[3]._id
      }
    ]);

    console.log('Posts created:', posts.length);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

importData();

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading posts...</div>;

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Latest Posts</h1>
        <p className="text-muted">Discover insights, tutorials, and stories.</p>
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)' }}>
          No posts available yet. Be the first to write one!
        </div>
      ) : (
        <div className="post-grid">
          {posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

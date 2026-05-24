import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/posts', { title, content });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Create New Post</h1>
        <p className="text-muted">Share your thoughts with the world.</p>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter an engaging title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea 
              className="form-input form-textarea" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your post content here..."
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

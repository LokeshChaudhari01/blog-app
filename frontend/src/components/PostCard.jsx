import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostCard = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await axios.get(`/posts/${post._id}/comments`);
      setComments(res.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`/posts/${post._id}/comments`, { content: newComment });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment', error);
    }
  };

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-content">{post.content}</div>
      <div className="post-meta">
        <span>By: {post.author?.email.split('@')[0] || 'Unknown'}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <button 
          className="btn btn-ghost" 
          style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>

        {showComments && (
          <div className="comments-section">
            {loadingComments ? (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Loading comments...</div>
            ) : (
              <div className="comments-list">
                {comments.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No comments yet.</p>
                ) : (
                  comments.map(c => (
                    <div key={c._id} className="comment-item">
                      <strong>{c.author?.email.split('@')[0] || 'Unknown'}</strong>
                      <p>{c.content}</p>
                    </div>
                  ))
                )}
              </div>
            )}
            
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..." 
                className="form-input" 
                style={{ fontSize: '0.85rem', padding: '0.5rem' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Post</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

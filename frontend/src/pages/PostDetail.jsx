import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get(`/posts/${postId}`),
          axios.get(`/posts/${postId}/comments`)
        ]);
        setPost(postRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching post');
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`/posts/${postId}/comments`, { content: newComment });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/posts/${postId}`);
        navigate('/');
      } catch (err) {
        console.error('Failed to delete post', err);
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading post...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</div>;
  if (!post) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Post not found.</div>;

  const isAuthor = user && user._id === post.author._id;

  return (
    <div className="main-content">
      <div style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>{post.title}</h1>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          By {post.author.email} on {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div style={{ lineHeight: '1.6', color: 'var(--text-color)', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
        
        {isAuthor && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <button className="btn btn-outline" onClick={() => alert('Edit feature coming soon!')}>Edit Post</button>
            <button className="btn" style={{ backgroundColor: '#dc3545', color: 'white' }} onClick={handleDelete}>Delete Post</button>
          </div>
        )}
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Comments ({comments.length})</h3>
        
        <form onSubmit={handleAddComment} style={{ marginBottom: '2rem' }}>
          <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="text" 
              className="form-input" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">Post</button>
          </div>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No comments yet. Be the first!</p>
          ) : (
            comments.map(comment => (
              <div key={comment._id} style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <strong>{comment.author.email}</strong> • {new Date(comment.createdAt).toLocaleDateString()}
                </div>
                <div style={{ color: 'var(--text-color)' }}>{comment.content}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

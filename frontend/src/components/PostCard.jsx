import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="post-card" 
      onClick={() => navigate(`/posts/${post._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <h2 className="post-title">{post.title}</h2>
      <p className="post-meta">
        By {post.author.email} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="post-content" style={{ maxHeight: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {post.content}
      </div>
      <div style={{ marginTop: '1rem', color: 'var(--primary-color)', fontWeight: 'bold' }}>
        Read More &rarr;
      </div>
    </div>
  );
};

export default PostCard;

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer';

import { showNotification } from '../reducers/notificationReducer';
import styles from './Blog.module.css';

const Blog = ({ blog, currentUser }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    dispatch(likeBlog(blog))

    dispatch(
      showNotification(
        `You liked "${blog.title}" by ${blog.author}`,
        'success',
        5
      )
    );
  }

const handleDelete = () => {
  if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
    try {
    dispatch(deleteBlog(blog.id));
    dispatch(
      showNotification(
        `Blog "${blog.title}" deleted successfully`,
        'success',
        5
      )
    );
    } catch (error) {
      console.log(error);
      dispatch(showNotification('Error deleting blog', 'error', 5));
    }
  }
};

  return (
    <div className={styles.blog}>
      <div className={styles.row}>
        <span className={styles.title}>
          {blog.title} — {blog.author}
        </span>
      </div>
        <div className={styles.blogDetails}>
          <div className={styles.blogurl}>URL: {blog.url}</div>
          <div>
            <div className={styles.blogLikes}>Likes: {blog.likes}</div>
            <button onClick={handleLike} className={styles.likeBtn}>
              Like
            </button>
          </div>
          <div className={styles.blogAuthor}>Added by: {blog.user?.name}</div>
          {currentUser && blog.user?.username === currentUser.username && (
            <button className={styles.deleteBtn} onClick={handleDelete}>
              delete blog
            </button>
          )}
        </div>
      
    </div>
  );
};

export default Blog;

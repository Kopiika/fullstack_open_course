import { useState } from 'react'
import styles from './Blog.module.css'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike = async () => {
    const updated = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlog(blog.id, updated, blog.user)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }
  return (
    <div className={styles.blogStyle}>
      <div className={styles.row}>
        <span className={styles.title}>
          {blog.title} — {blog.author}
        </span>
        <button className={styles.viewBtn} onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div>URL: {blog.url}</div>
          <div>
            <div>Likes: {blog.likes}</div>
            <button onClick={handleLike} className={styles.likeBtn}>like</button>
          </div>
          <div >Added by: {blog.user?.name}</div>
          {currentUser && blog.user?.username === currentUser.username && (
            <button className={styles.deleteBtn} onClick={handleDelete}>delete blog</button>
          )}
        </div>
      )}
    </div>
  )
}



export default Blog
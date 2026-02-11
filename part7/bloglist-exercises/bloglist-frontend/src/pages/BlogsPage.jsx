import styles from './BlogsPage.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';

const BlogList = () => {
  const blogFormRef = useRef();
  const blogs = useSelector((state) => state.blogs);
   const addBlog = async (blogObject) => {
     try {
       dispatch(createBlog(blogObject));
       blogFormRef.current.toggleVisibility();
       dispatch(
         showNotification(
           `a new blog "${blogObject.title}" by ${blogObject.author} added`,
           'success',
           5
         )
       );
     } catch (error) {
       console.log(error);
       dispatch(showNotification('Error creating blog', 'error', 5));
     }
   };

  return (
    <div>
      <div className={styles.newBlogContainer}>
        <Togglable
          buttonLabel="Create new blog"
          ref={blogFormRef}
          buttonClass="newBlogButton"
        >
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>

      <div className={styles.blogList}>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

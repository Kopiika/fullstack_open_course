import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import styles from './App.module.css';
import { showNotification } from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sorted = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sorted);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      console.log('Token set:', user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      dispatch(showNotification('Wrong username or password', 'error', 5));
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogService.setToken(null);
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);

      const blogWithUser = {
        ...returnedBlog,
        user: user,
      };

      //setBlogs(blogs.concat(returnedBlog))
      setBlogs(blogs.concat(blogWithUser));
      blogFormRef.current.toggleVisibility();
      dispatch(
        showNotification(
          `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`,
          'success',
          5
        )
      );
    } catch (exception) {
      console.log(exception);
      dispatch(showNotification('Error creating blog', 'error', 5));
    }
  };

  const updateBlog = async (id, updatedBlog, userObj) => {
    const returned = await blogService.update(id, updatedBlog);
    const blogWithUser = {
      ...returned,
      user: userObj,
    };
    const updatedBlogs = blogs.map((b) => (b.id !== id ? b : blogWithUser));

    updatedBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(updatedBlogs);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      dispatch(showNotification('Blog deleted successfully', 'success', 5));
    } catch (error) {
      console.log(error);
      dispatch(showNotification('Error deleting blog', 'error', 5));
    }
  };

  return (
    <div>
      <Notification />

      <div className={styles.topBar}>
        <p className={styles.userInfo}>
          <span className={styles.username}>{user.name}</span> logged in
        </p>
        <button className={styles.logoutButton} onClick={handleLogOut}>
          Log out
        </button>
      </div>

      <h2 className={styles.title}>Blogs</h2>
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
          <Blog
            key={blog.id}
            blog={blog}
            currentUser={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

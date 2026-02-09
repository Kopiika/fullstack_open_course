import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import styles from './App.module.css';

import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { setUser, clearUser } from './reducers/userReducer';


const App = () => {
  //const [blogs, setBlogs] = useState([]);
  //const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      console.log('Token set:', user.token);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
    } catch {
      dispatch(showNotification('Wrong username or password', 'error', 5));
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogService.setToken(null);
    dispatch(clearUser());
  };

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
          <Blog key={blog.id} blog={blog} currentUser={user} />
        ))}
      </div>
    </div>
  );
};

export default App;

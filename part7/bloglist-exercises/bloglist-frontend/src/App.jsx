import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom';

import BlogView from './pages/BlogView';
import BlogPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';

import blogService from './services/blogs';
import loginService from './services/login';

import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { setUser, clearUser } from './reducers/userReducer';

const App = () => {
  /*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');*/

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user);
  /*const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);*/

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

  /*const handleLogin = async (event) => {
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
  };*/

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogService.setToken(null);
    dispatch(clearUser());
    navigate('/login');
  };

 

  if (user === null) {
    return (
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />{' '}
        </Routes>
      </div>
    );
  }

  return (
    <div>
      <Menu handleLogOut={handleLogOut} />

      <Notification />

      <Routes>
        <Route path="/" element={<BlogPage blogFormRef={blogFormRef} />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;

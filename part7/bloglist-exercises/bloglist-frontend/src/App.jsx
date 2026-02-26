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
import { Container } from '@mui/material';

import BlogView from './pages/BlogView';
import BlogPage from './pages/BlogsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import UserView from './pages/UserView';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';

import blogService from './services/blogs';
import loginService from './services/login';

import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { setUser, clearUser } from './reducers/userReducer';

const App = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user);

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

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    blogService.setToken(null);
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <>
      <Menu handleLogOut={handleLogOut} />
      <Container
        sx={{
          height: '100vh',
        }}
      >
        <Notification />

        <Routes>
          <Route path="/" element={user ? <BlogPage blogFormRef={blogFormRef} /> : <Navigate to="/login" replace />} />
          <Route path="/blogs/:id" element={user ? <BlogView /> : <Navigate to="/login" replace />} />
          <Route path="/users" element={user ? <UsersPage /> : <Navigate to="/login" replace />} />
          <Route path="/users/:id" element={user ? <UserView /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;

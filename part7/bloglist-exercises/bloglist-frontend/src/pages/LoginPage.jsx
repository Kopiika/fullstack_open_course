import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import Notification from '../components/Notification';

import loginService from '../services/login';
import blogService from '../services/blogs';

import { setUser } from '../reducers/userReducer';
import { showNotification } from '../reducers/notificationReducer';
import Menu from '../components/Menu';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (error) {
      dispatch(showNotification('Wrong username or password', 'error', 5));
    }
  };

  return (
    <div>
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
};

export default LoginPage;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Menu.module.css'

const Menu = ({ handleLogOut }) => {
  const user = useSelector((state) => state.user);
  const padding = {
    paddingRight: 5,
  };
  return (
    <div className={styles.topBar}>
      <h2>Blogs App</h2>

      <div className={styles.menuLinks}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {!user && (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      {user && (
        <div className={styles.user}>
          <p className={styles.userInfo}>
            <span className={styles.username}>{user.name}</span> logged in
          </p>
          <button className={styles.logoutButton} onClick={handleLogOut}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;

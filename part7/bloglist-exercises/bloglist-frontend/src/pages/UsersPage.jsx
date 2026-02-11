import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeUsers } from '../reducers/usersReducer';


const UsersPage = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default UsersPage

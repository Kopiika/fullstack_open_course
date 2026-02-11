import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserView = () => {
	const { id } = useParams();

  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

	return (
		<div>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Blog from '../components/Blog';

const BlogView = () => {
  const { id } = useParams();

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  //console.log(blog)
  const user = useSelector((state) => state.user);

  if (!blog) return null;

  return <Blog blog={blog} currentUser={user} />;
};

export default BlogView;

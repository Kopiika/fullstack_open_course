import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { createBlog } from '../reducers/blogReducer';
import { showNotification } from '../reducers/notificationReducer';
import BlogForm from '../components/BlogForm';
import Togglable from '../components/Togglable';
import {
  Container,
  Paper,
  ListItem,
  ListItemText,
  List
} from '@mui/material';

const BlogsPage = () => {
  const dispatch = useDispatch();
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
    <Container maxWidth="600px">
      <Togglable
        buttonLabel="Create new blog"
        ref={blogFormRef}
        buttonClass="newBlogButton"
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <List>
        {blogs.map((blog) => (
          <ListItem
            key={blog.id}
            sx={{
              px: 0,
              py: 1,
            }}
          >
            <Paper
              sx={{
                width: '100%',
                px: 2,
                py: 1,
              }}
              elevation={6}
            >
              <Link to={`/blogs/${blog.id}`}>
                <ListItemText sx={{ textTransform: 'capitalize' }}
                  primary={blog.title}
                  secondary={blog.author}
                ></ListItemText>
              </Link>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BlogsPage;

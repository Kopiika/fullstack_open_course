import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer';

import { showNotification } from '../reducers/notificationReducer';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Blog = ({ blog, currentUser }) => {
  const [comment, setComment] =useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    dispatch(likeBlog(blog))

    dispatch(
      showNotification(
        `You liked "${blog.title}" by ${blog.author}`,
        'success',
        5
      )
    );
  }

  const handleAddComment = (event) => {
    event.preventDefault();
    if (!comment.trim()) return;

    dispatch(addComment(blog.id, comment))
    dispatch(
      showNotification(
        `You added new comment to "${blog.title}" by ${blog.author}`,
        'success',
        5
      )
    );
    setComment('');
    if (!comment.trim()) return;
  }

const handleDelete = () => {
  if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
    try {
      dispatch(deleteBlog(blog.id));
      
    dispatch(
      showNotification(
        `Blog "${blog.title}" deleted successfully`,
        'success',
        5
      )
    );
      navigate('/');
    } catch (error) {
      console.log(error);
      dispatch(showNotification('Error deleting blog', 'error', 5));
    }
  }
};

  return (
    <Card
      sx={{ maxWidth: 700, mx: 'auto', mt: 4, borderRadius: 3, boxShadow: 3 }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" align="center" marginBottom={4} gutterBottom textTransform={'capitalize'}>
          {blog.title} — {blog.author}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          URL: {blog.url}
        </Typography>

        {/* Likes */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography>Likes: {blog.likes}</Typography>
          <Button
            onClick={handleLike}
            variant="contained"
            size='small'
            startIcon={<FavoriteIcon />}
          >
            like
          </Button>
        </Box>

        {/* Author */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          Added by: {blog.user?.name}
        </Typography>

        {/* Delete button */}
        {currentUser && blog.user?.username === currentUser.username && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleDelete}
            sx={{ mb: 3 }}
          >
            Delete blog
          </Button>
        )}
        <Divider sx={{ mb: 3 }} />

        {/* Comment form */}
        <Typography variant="h6" gutterBottom>
          Add comment
        </Typography>
        <Box
          component="form"
          onSubmit={handleAddComment}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 4,
          }}
        >
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            required
          />

          <Box sx={{ textAlign: 'right' }}>
            <Button type="submit" variant="contained">
              Add comment
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Comments list */}
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>

        <List>
          {blog.comments.map((comment, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={comment} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Blog;

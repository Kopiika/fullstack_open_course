import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <Box
      sx={{
        p: 2,
        border: '1px dashed grey',
        
        borderRadius: 1,
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        align="center"
        gutterBottom
      >
        Create new blog
      </Typography>

      <form
        onSubmit={addBlog}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          width: '300px',
          margin: '0 auto',
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
          required
        />

        <TextField
          label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          fullWidth
          required
        />

        <TextField
          label="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          fullWidth
          required
        />

        <Button color="success" type="submit" variant="contained" fullWidth>
          Create
        </Button>
      </form>
    </Box>
  );
};

export default BlogForm;

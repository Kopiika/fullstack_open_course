import { useState } from 'react';
import styles from './BlogForm.module.css';

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
    <div className={styles.formContainer}>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <label className={styles.label}>
          title
          <input
            className={styles.input}
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label className={styles.label}>
          author
          <input
            placeholder="author"
            className={styles.input}
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label className={styles.label}>
          url
          <input
            className={styles.input}
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>

        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;

import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> calls createBlog with correct details when new blog is created', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText('title');
  const inputAuthor = screen.getByPlaceholderText('author');
  const inputUrl = screen.getByPlaceholderText('url');
  const submitButton = screen.getByText('Create');

  await user.type(inputTitle, 'Testing a form');
  await user.type(inputAuthor, 'Test Author');
  await user.type(inputUrl, 'https://test-form.com');
  await user.click(submitButton);
  console.log(createBlog.mock.calls);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Testing a form',
    author: 'Test Author',
    url: 'https://test-form.com',
  });
});

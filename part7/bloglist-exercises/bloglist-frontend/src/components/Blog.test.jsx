import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { vi } from 'vitest';

describe('<Blog />', () => {
  let blog;
  let mockUpdate;
  beforeEach(() => {
    blog = {
      title: 'Test Blog',
      author: 'Test User',
      url: 'http://example.com',
      likes: 10,
      user: { username: 'testuser', name: 'Test User' },
    };
    mockUpdate = vi.fn();
    render(
      <Blog blog={blog} currentUser={blog.user} updateBlog={mockUpdate} />
    );
  });

  test('renders title and author, but not URL or likes by default', () => {
    //title and author should be displayed
    const titleElement = screen.getByText('Test Blog — Test User');
    expect(titleElement).toBeDefined();

    // URL та likes should not be displayed
    const urlElement = screen.queryByText(/http:\/\/example.com/);
    expect(urlElement).toBeNull();

    const likesElement = screen.queryByText(/Likes:/);
    expect(likesElement).toBeNull();
  });

  test('after clicking the view button, url and likes are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const urlElement = screen.getByText('URL: http://example.com');
    expect(urlElement).toBeVisible();

    const likesElement = screen.getByText('Likes: 10');
    expect(likesElement).toBeVisible();
  });

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup();
    //open details
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    //clicking the like button twice
    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockUpdate).toHaveBeenCalledTimes(2);
  });
});

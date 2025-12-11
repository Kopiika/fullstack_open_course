import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not URL or likes by default', () => {
  const blog = {
	title: 'Test Blog',
	author: 'Test User',
	url: 'http://example.com',
   likes: 10,
   user: { username: 'testuser', name: 'Test User' }
  }

  render(<Blog blog={blog} currentUser={blog.user}/>)

  //title and author should be displayed
  const titleElement = screen.getByText('Test Blog — Test User')
  expect(titleElement).toBeDefined()

  // URL та likes should not be displayed
  const urlElement = screen.queryByText(/http:\/\/example.com/)
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText(/Likes:/)
  expect(likesElement).toBeNull()
})
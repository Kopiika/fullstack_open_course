const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
	// reset db
	 await request.post('/api/testing/reset')
	 // create user
	 await request.post('/api/users', {
      data: {
        name: 'User One',
        username: 'user1',
        password: 'password1'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
	const locator = page.getByText('Log in to application')
	await expect(locator).toBeVisible()
	await expect(page.getByLabel('username')).toBeVisible()
	await expect(page.getByLabel('password')).toBeVisible()
	await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

 describe('Login', () => {
	test('succeeds with correct credentials', async ({ page }) => {
		await loginWith(page, 'user1', 'password1')
   	await expect(page.getByText('user one logged in')).toBeVisible()
	})

	test('fails with wrong credentials', async ({ page }) => {
		await loginWith(page, 'user1', 'wrong')
		await expect(page.getByText('Wrong username or password')).toBeVisible()
		await expect(page.getByText('user one logged in')).not.toBeAttached()
	})
 })

 describe('When logged in', () => {
	beforeEach(async ({ page }) => {
		await loginWith(page, 'user1', 'password1')
	})
 
	test('a new blog can be created', async ({ page }) => {
		await createBlog(page, 'a playwright blog', 'playwright test', 'https://playwright')
      await expect(page.getByText('a new blog "a playwright blog" by playwright test added')).toBeVisible()
	})

	test('blog can be liked', async ({ page }) => {
		//create new blog
		await createBlog(page, 'a playwright blog', 'playwright test', 'https://playwright')
		await page.getByRole('button', { name: 'cancel' }).click();
		// open blog details
		await page.getByRole('button', { name: 'View' }).click()
		// like blog
		await page.getByRole('button', { name: 'Like' }).click()
		// assert likes increased
		await expect(page.getByText('likes: 1')).toBeVisible()
	 })

 })

 describe('When new blog added', () =>{
	beforeEach(async ({ page }) => {
		//login
		await loginWith(page, 'user1', 'password1')
	})

	test('user who created a blog can delete it', async ({ page }) => {
		//create new blog
		await createBlog(page, 'blog for deleting', 'test author', 'https://deleting-blog')
		await page.getByRole('button', { name: 'cancel' }).click();

		const blog = page.locator('text=blog for deleting').locator('..');
		await blog.getByRole('button', { name: 'View' }).click();
		page.once('dialog', dialog => dialog.accept());
		await page.getByRole('button', { name: /delete/i }).click()
		await expect(
			page.locator('.blogList span', { hasText: 'blog for deleting' })
		).not.toBeVisible();
	})

	test('only creator sees delete button', async ({ page, request }) => {
		//create new blog by user1
		await createBlog(page, 'blog for deleting', 'test author', 'https://geleting-blog')
		await page.getByRole('button', { name: 'cancel' }).click();
		// user1 log out
		await page.getByText('Log out').click();

		//create user2
		await request.post('/api/users', {
			data: {
			  username: 'user2',
			  name: 'User Two',
			  password: 'password2',
			},
		 });
	 
		// user2 logs in
		await loginWith(page, 'user2', 'password2')

		// open blogs details
		const blog = page.locator('text=blog for deleting').locator('..');
		await blog.getByRole('button', { name: 'View' }).click();
	 
		// delete button is not visible
		await expect(
		  blog.getByText(/delete/i)
		).not.toBeVisible();
	 });
	
	 test('blogs are ordered by likes, most likes first', async ({ page }) => {
		//create First blog
		await createBlog(page, 'First blog', 'Author One', 'http://first.com')
		await expect(page.getByText('a new blog "First blog" by Author One added')).toBeVisible()
	
		//create Second blog
		await createBlog(page, 'Second blog', 'Author Two', 'http://second.com')
		await expect(page.getByText('a new blog "Second blog" by Author Two added')).toBeVisible()
	
		//create Third blog
		await createBlog(page, 'Third blog', 'Author Three', 'http://third.com')
		await expect(page.getByText('a new blog "Third blog" by Author Three added')).toBeVisible()
	
		// like blogs
		const first = page.locator('text=First blog — Author One').locator('..');
		const second = page.locator('text=Second blog — Author Two').locator('..');
		const third = page.locator('text=Third blog — Author Three').locator('..');
		// second blog
		await second.getByRole('button', { name: 'view' }).click();
		await page.getByRole('button', { name: 'Like' }).click();
		await expect(page.getByText('Likes: 1')).toBeVisible();
		await page.getByRole('button', { name: 'Like' }).click();
		await expect(page.getByText('Likes: 2')).toBeVisible();
		await second.getByRole('button', { name: 'hide' }).click();
		// first blog
		await first.getByRole('button', { name: 'view' }).click();
		await page.getByRole('button', { name: 'Like' }).click();
		await expect(page.getByText('likes: 1')).toBeVisible();
		await first.getByRole('button', { name: 'hide' }).click();
		// third blog
		await third.getByRole('button', { name: 'view' }).click();
		await page.getByRole('button', { name: 'Like' }).click();
		await expect(page.getByText('Likes: 1')).toBeVisible();
		await page.getByRole('button', { name: 'Like' }).click();
		await expect(page.getByText('Likes: 2')).toBeVisible();
		await page.getByRole('button', { name: 'Like' }).click();
		await expect(page.getByText('likes: 3')).toBeVisible();
		await third.getByRole('button', { name: 'hide' }).click();
		
		// check the order
		const blogs = page.locator('[class*="blog_"]');
		await expect(blogs.nth(0)).toContainText('Third blog — Author Three');
		await expect(blogs.nth(1)).toContainText('Second blog — Author Two');
		await expect(blogs.nth(2)).toContainText('First blog — Author One');
	}); 
 });
});

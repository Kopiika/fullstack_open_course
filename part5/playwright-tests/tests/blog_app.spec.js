const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
	// reset db
	 await request.post('http://localhost:3003/api/testing/reset')
	 // create user
	 await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'User One',
        username: 'user1',
        password: 'password1'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
	/*await loginWith(page, 'user1', 'password1')
   await expect(page.getByText('user one logged in')).toBeVisible()*/

  const locator = page.getByText('Log in to application')
  await expect(locator).toBeVisible()

  await expect(page.getByLabel('username')).toBeVisible()
  await expect(page.getByLabel('password')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

 describe('Login', () => {
	test('succeeds with correct credentials', async ({ page }) => {
		await page.getByLabel('username').fill('user1')
		await page.getByLabel('password').fill('password1')
	   await page.getByRole('button', { name: 'Login' }).click()
		await expect(page.getByText('user one logged in')).toBeVisible()
	})

	test('fails with wrong credentials', async ({ page }) => {
		await page.getByLabel('username').fill('user1')
		await page.getByLabel('password').fill('1234')
	   await page.getByRole('button', { name: 'Login' }).click()
		await expect(page.getByText('Wrong username or password')).toBeVisible()
		await expect(page.getByText('user one logged in')).not.toBeAttached()
	})
 })

 describe('When logged in', () => {
	beforeEach(async ({ page }) => {
		await page.getByLabel('username').fill('user1')
		await page.getByLabel('password').fill('password1')
	   await page.getByRole('button', { name: 'login' }).click()
	})
 
	test('a new blog can be created', async ({ page }) => {
		await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.getByLabel('title').fill('a playwright blog')
		await page.getByLabel('author').fill('playwright test')
		await page.getByLabel('url').fill('https://playwright')
      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.getByText('a new blog "a playwright blog" by playwright test added')).toBeVisible()
	})

	test('blog can be liked', async ({ page }) => {
		//create new blog
		await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.getByLabel('title').fill('new blog')
		await page.getByLabel('author').fill('new author')
		await page.getByLabel('url').fill('https://new-blog')
      await page.getByRole('button', { name: 'Create' }).click()

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
		await page.getByLabel('username').fill('user1')
		await page.getByLabel('password').fill('password1')
	   await page.getByRole('button', { name: 'login' }).click()
		await expect(page.getByText('user one logged in')).toBeVisible();
		//create new blog
		await page.getByRole('button', { name: 'Create new blog' }).click()
      await page.getByLabel('title').fill('blog for deleting')
		await page.getByLabel('author').fill('test author')
		await page.getByLabel('url').fill('https://geleting-blog')
      await page.getByRole('button', { name: 'Create' }).click()
		await page.getByRole('button', { name: 'cancel' }).click();
	})

	test('user who created a blog can delete it', async ({ page }) => {
		const blog = page.locator('text=blog for deleting').locator('..');
		await blog.getByRole('button', { name: 'View' }).click();
		//await expect(blog.getByText(/delete/i)).toBeVisible();
		page.once('dialog', dialog => dialog.accept());
		await page.getByRole('button', { name: /delete/i }).click()
		await expect(
			page.locator('.blogList span', { hasText: 'blog for deleting' })
		).not.toBeVisible();
	})

	test('only creator sees delete button', async ({ page, request }) => {
		// створюємо другого користувача
		await request.post('http://localhost:3003/api/users', {
		  data: {
			 username: 'user2',
			 name: 'User Two',
			 password: 'password2',
		  },
		});
	 
		await page.getByText('Log out').click();
	 
		// --- user2 logs in ---
		await page.getByLabel('username').fill('user2');
		await page.getByLabel('password').fill('password2');
		await page.getByRole('button', { name: 'login' }).click();
	 
		// відкриваємо блог
		const blog = page.locator('text=blog for deleting').locator('..');
		await blog.getByRole('button', { name: 'View' }).click();
	 
		// ❌ delete НЕ має бути видно
		await expect(
		  blog.getByText(/delete/i)
		).not.toBeVisible();
	 });
	
	 
	 
 })

 test('blogs are ordered by likes, most likes first', async ({ page }) => {
	//login
	await page.getByLabel('username').fill('user1')
	await page.getByLabel('password').fill('password1')
	await page.getByRole('button', { name: 'login' }).click()
	await expect(page.getByText('user one logged in')).toBeVisible();
	// створюємо 3 блоги
	await page.getByRole('button', { name: 'Create new blog' }).click()
	await page.getByLabel('title').fill('First blog');
	await page.getByLabel('author').fill('Author One');
	await page.getByLabel('Url').fill('http://first.com');
	await page.getByRole('button', { name: 'Create' }).click();
	await expect(page.getByText('a new blog "First blog" by Author One added')).toBeVisible()

	// створюємо другий блог
	await page.getByRole('button', { name: 'Create new blog' }).click()
	await page.getByLabel('title').fill('Second blog');
	await page.getByLabel('author').fill('Author Two');
	await page.getByLabel('url').fill('http://second.com');
	await page.getByRole('button', { name: 'Create' }).click();
	await expect(page.getByText('a new blog "Second blog" by Author Two added')).toBeVisible()

	// створюємо третій блог
	await page.getByRole('button', { name: 'Create new blog' }).click()
	await page.getByLabel('title').fill('Third blog');
	await page.getByLabel('author').fill('Author Three');
	await page.getByLabel('url').fill('http://third.com');
	await page.getByRole('button', { name: 'Create' }).click();
	await expect(page.getByText('a new blog "Third blog" by Author Three added')).toBeVisible()

	// лайкаємо блоги різну кількість разів
	const first = page.locator('text=First blog — Author One').locator('..');
	const second = page.locator('text=Second blog — Author Two').locator('..');
	const third = page.locator('text=Third blog — Author Three').locator('..');
	// 2
	await second.getByRole('button', { name: 'view' }).click();
	await page.getByRole('button', { name: 'Like' }).click();
	await expect(page.getByText('Likes: 1')).toBeVisible();
	await page.getByRole('button', { name: 'Like' }).click();
	await expect(page.getByText('Likes: 2')).toBeVisible();
	await second.getByRole('button', { name: 'hide' }).click();
	
	// 1 
	await first.getByRole('button', { name: 'view' }).click();
	await page.getByRole('button', { name: 'Like' }).click();
	await expect(page.getByText('likes: 1')).toBeVisible();
	await first.getByRole('button', { name: 'hide' }).click();
	
	// 3
	await third.getByRole('button', { name: 'view' }).click();
	await page.getByRole('button', { name: 'Like' }).click();
	await expect(page.getByText('Likes: 1')).toBeVisible();
	await page.getByRole('button', { name: 'Like' }).click();
	await expect(page.getByText('Likes: 2')).toBeVisible();
	await page.getByRole('button', { name: 'Like' }).click();
	await expect(page.getByText('likes: 3')).toBeVisible();
	await third.getByRole('button', { name: 'hide' }).click();
	
	// перевіряємо порядок
	const blogs = page.locator('[class*="blog_"]');

	await expect(blogs.nth(0)).toContainText('Third blog — Author Three');
	await expect(blogs.nth(1)).toContainText('Second blog — Author Two');
	await expect(blogs.nth(2)).toContainText('First blog — Author One');
});
 
})

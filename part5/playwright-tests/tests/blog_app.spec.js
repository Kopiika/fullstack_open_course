const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
	 await request.post('http://localhost:3003/api/testing/reset')
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
 })
 
})

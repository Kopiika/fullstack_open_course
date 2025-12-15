# 🎭 End-to-End Tests – Blog List

This project contains **end-to-end (E2E) tests** for the [Blog List](https://github.com/Kopiika/fullstack_open_course/tree/main/part5/bloglist-frontend) application, created as part of  
[Full Stack Open – Part 5](https://fullstackopen.com/en/part5).

The tests simulate real user behavior in a browser using **Playwright**.

---

## 🚀 What Is Tested

- User login
- Login failure with wrong credentials
- Creating a new blog
- Liking a blog
- Deleting a blog
- Authorization rules (only creator can delete)
- Blog sorting by number of likes

---

## 🗂️ Project Structure

```bash
part5/playwright-tests/
├── tests/
│   ├── blog_app.spec.js   # Main E2E test suite 
│   └── helper.js
│
├── playwright.config.js
├── package.json
└── README.md
```
---
## 🧪 Testing Strategy

End-to-end tests:

- Interact with the real UI

- Use real backend API

- Reset database state before tests

- Ensure critical user flows work as expected

Custom test helpers are used to:
- Create users

- Create blogs

- Log in programmatically

- Set up test data efficiently

---

### ▶️ Running Tests

Make sure:

1. Backend is running
```bash
npm run start:test
```

2. Frontend is running
```bash
npm run dev
```

Then run:
```bash
npm test
```
Or open Playwright UI:
```bash
npm test -- --ui
```
---
## 🛠️ Tools Used

- Playwright

- Node.js

- Browser automation (Chromium)

---
## 💡 Helpful Notes for Working with Playwright

### 🔌 VS Code Extension

For a better development and debugging experience, it is highly recommended to install the  
**“Playwright Test for VS Code”** extension.

Benefits:
- Run tests directly from the editor
- Visual test results and trace viewer
- Built-in debugging support
- Easy navigation between tests
---
### 🌐 Running Tests in Chromium Only

To run tests **only in Chromium**, use:

```bash
npm test -- --project chromium
```
This is useful when focusing on a single browser during development.

---
### 🎯 Running a Single Test
You can run a specific test by using the -g (grep) command-line option:
```bash
npm test -- -g "login fails with wrong password"
```
This helps isolate and debug individual test cases.

---

### 🐞 Debugging a Failing Test
To run a problematic test in debug mode, use:
```bash
npm test -- -g "one of those can be made nonimportant" --debug
```
---

### ⚙️ Test Generator (Codegen)
Playwright provides a test generator that records user interactions and generates test code automatically:

```bash
npx playwright codegen http://localhost:5173/
```
This is especially useful for:

- Learning Playwright syntax

- Quickly creating E2E tests

- Exploring selectors and user flows

---

## 🌱 Challenges I Faced

- Keeping test state isolated and repeatable

- Handling async UI updates

- Managing authentication in E2E tests

- Debugging flaky tests

- Structuring tests for readability

End-to-end testing helped me understand how all application layers work together.

---
## 📜 License

This project is part of the **Full Stack Open** course
and is intended for learning purposes only.
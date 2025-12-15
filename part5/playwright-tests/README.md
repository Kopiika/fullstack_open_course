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
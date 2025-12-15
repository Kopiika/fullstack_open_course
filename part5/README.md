# 🧩 Part 5 – Testing React Apps & Authentication

This folder contains my completed exercises for [Part 5](https://fullstackopen.com/en/part5) of the **Full Stack Open** course.

In this part, I implement **token-based authentication**, write **unit and integration tests for React**, and add **end-to-end tests** using Playwright.

> **Note:** The backend for this project is located in [part4/bloglist-backend](https://github.com/Kopiika/fullstack_open_course/tree/main/part4/bloglist-backend)  
> and provides the REST API for blogs and users.
---

## 📚 Covered Topics

- Token-based authentication in the frontend
- Login functionality with JWT
- Conditional rendering based on authentication state
- React component testing
- End-to-end testing with Playwright
- Modern ESLint configuration

---
## 🗂️ Projects

### 📦 bloglist-frontend
Frontend for the Blog List application:
- React + Vite
- Login & authentication
- Blog creation, liking, and deletion
- Component and integration tests

### 🎭 playwright-tests
End-to-end tests for the Blog List application:
- Automated browser testing
- User interaction flows
- Authentication scenarios

---
## 🗂️ Folder Structure (Overview)
```bash
part4/
├── bloglist-frontend/   
├── playwright-tests/   
└─ README.md
```
---
## 🚀 How to Run the Backend Locally

1. Install dependencies:
```bash
npm install
```
2. Set up environment variables (e.g. `MONGODB_URI`, `SECRET` for JWT).
3. To run in development mode:
```bash
npm run dev
```
To run production:
```bash
npm start
```
4. To run tests:
```bash
npm test
```
---
## 🧪 Testing Focus

Part 5 introduces **multiple levels of testing**:

- **Component tests** (React Testing Library + Jest)
- **Integration tests** (state + UI interaction)
- **End-to-end tests** (Playwright)

This part significantly improves confidence in frontend correctness and stability.
---

## 📜 License

This work follows the educational material from Full Stack Open 2024 and is intended for learning purposes only.
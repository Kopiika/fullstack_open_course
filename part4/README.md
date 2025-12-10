# Part 4 – Testing Express servers & User administration

This folder contains my completed exercises for [Part 4](https://fullstackopen.com/en/part4) of the **Full Stack Open** course.

The focus of this part is on backend development, specifically writing **unit** and **integration tests**, as well as implementing **user authentication** and **authorization** to build a reliable and secure server-side application.

---

## 📚 Covered Topics

- **Backend testing** — writing unit tests (e.g. for utility functions) and integration tests (e.g. HTTP API endpoints) using a test framework and a library for HTTP testing. 

- **Express + MongoDB** — building RESTful endpoints for blog posts and users; modelling data with a schema; returning JSON. 

- **User administration & authentication** — password hashing, user creation, login flow with tokens, restricting certain operations to authenticated users. 

- **Secure API design** — REST principles, handling edge cases (e.g. invalid data, missing fields), validating input, ensuring that operations such as deleting a blog can only be performed by the original creator.

---
## 📦 blog-list — REST API project

This subfolder implements the [Blog-list](https://github.com/Kopiika/fullstack_open_course/tree/main/part4/blog-list) project as described in the course (final exercises 4.1-4.23). The API allows:

- Listing all blogs

- Creating a new blog (only for authenticated users)

- Deleting a blog (only by its creator)

- Updating the number of likes on a blog

User accounts are supported, and when listing blogs or users, relevant relations are embedded (e.g. each blog shows its creator, each user shows their blogs).

---
## 🗂️ Folder Structure (Overview)
```bash
part4/
├── blog-list/   # REST API project
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
## 🧪 Testing

The test suite includes:

- Unit tests for utility functions (e.g. list helper functions).

- Integration tests for API endpoints using an HTTP testing library.

- Verification of behavior such as: missing likes defaults to 0, missing required fields (title or url) result in 400 Bad Request, correct handling of unique identifier renaming (e.g. using id instead of _id).
---


## 📚 Notes

Part 4 of the Fullstack Open course focuses on building robust backends. You learn not only to implement features, but also to test them and ensure security via authentication and authorization — essential skills for production-ready web applications.

## 📜 License

This work follows the educational material from Full Stack Open 2024 and is intended for learning purposes only.
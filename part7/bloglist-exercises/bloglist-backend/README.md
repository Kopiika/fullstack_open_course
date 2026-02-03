# 📝 Blog List Backend – Full Stack Open (Part 4)

This project is my backend implementation for the **“Blog List”** assignment [Full Stack Open – Part 4](https://fullstackopen.com/en/part4).

It provides a **REST API** for managing blogs and users, including authentication and authorization.
The backend is built with **Node.js**, **Express**, **MongoDB** (via **Mongoose**), and is thoroughly **tested**.

---

## 🚀 Features
- REST API for blogs and users

- User registration & login with JWT authentication

- Password hashing with bcrypt

- Blog ownership & authorization (only creator can delete a blog)

- Default values (e.g. likes = 0)

- Proper error handling for invalid data and unauthorized actions

- Fully tested backend (unit & integration tests)

- Environment-based configuration (test / development / production)

---

## 🗂️ Project Structure
```
part4/blog-list/
├── controllers/
│   ├── blogs.js           # Blog-related routes
│   ├── users.js           # User creation routes
│   └── login.js           # Authentication routes
│
├── models/
│   ├── blog.js            # Blog schema & toJSON transformation
│   └── user.js            # User schema, password hashing
│
├── utils/
│   ├── config.js          # Environment variable handling
│   ├── logger.js          # Logging utilities
│   ├── middleware.js      # Token extractor, error handler
│   └── list_helper.js     # Blog utility functions
│
├── tests/
│   ├── blog_api.test.js   # Blog API integration tests
│   ├── user_api.test.js   # User API tests
│   ├── login_api.test.js  # Login tests
│   └── list_helper.test.js# Unit tests for helper functions
│
├── app.js                 # Express app configuration
├── index.js               # Entry point
│
├── .env                   # Environment variables (not committed)
├── .env.test              # Test database configuration
├── .gitignore
├── eslint.config.mjs
│
├── package.json
├── package-lock.json
└── README.md

```
---
## 📝 How It Works
### 📌 Database
The backend uses **MongoDB** via Mongoose.
Environment variables:
```bash
MONGODB_URI
TEST_MONGODB_URI
SECRET
```
### Schemas

- **Blog**
	- title (required)
	- author
	- url (required)
	- likes (default: 0)
	- user (reference to User)

- **User**
	- username (unique, required)
	- name
	- passwordHash
	- blogs (array of blog references)

### 📌 API Endpoints

**Blogs**

| Method |      Endpoint      | Description |
|--------|--------------------|-------------|
| GET    | `/api/blogs`     | Get all blogs |
| POST   | `/api/blogs `    | Create blog (auth required) |
| PUT    | `/api/blogs/:id` | Update blog likes |
| DELETE | `/api/blogs/:id` | Delete blog (only owner) |

**Users**

| Method |      Endpoint      | Description |
|--------|--------------------|-------------|
| GET    | `/api/users`     | Get all users |
| POST   | `/api/users `    | Create new user |

**Authentication**

| Method |      Endpoint      | Description |
|--------|--------------------|-------------|
| POST    | `/api/login`     | Login and receive JWT |


### 🧪 Testing

This project includes extensive automated tests:

✅ **Unit Tests**

- Utility functions in list_helper.js

- Functions such as:
	- total likes
	- favorite blog
	- most blogs
	- most likes

✅ **Integration Tests**

- Blog creation, updating, deletion

- Default values (likes = 0)

- Validation errors (missing title or url → 400)

- Authorization rules (cannot delete another user’s blog)

- Login and token verification

- Users API behavior

Run tests:
```bash
npm test
```

Tests run against a **separate test database** to keep data isolated.

---

## 💻 Running the Backend Locally

1. Clone the repository
```bash
git clone https://github.com/Kopiika/fullstack_open_course.git
cd part4/blog-list
```
2. Install dependencies
```bash
npm install
```
3. Create .env
```bash
MONGODB_URI=your_mongodb_connection_string
TEST_MONGODB_URI=your_test_database_url
SECRET=your_jwt_secret
PORT=3003
```
4. Start the server
```bash
npm run dev
```
**API available at:**
```bash
http://localhost:3003/api/blogs
```

## 🛠️ Development Tools
- Jest – testing framework

- Supertest – HTTP API testing

- bcrypt – password hashing

- jsonwebtoken – authentication

- ESLint – linting

- nodemon – development server

Run lint:
```bash
npm run lint
```

---
## 🌱 Challenges I Faced

Working on Part 4 helped me understand:

- How to design and test a backend API properly

- Difference between unit tests and integration tests

- How to use separate test databases

- Implementing JWT authentication securely

- Handling authorization (ensuring only the blog owner can delete)

- Structuring Express applications for scalability

- Debugging failing tests and asynchronous behavior

This part significantly improved my confidence in backend testing and API security.

## 📜 License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.



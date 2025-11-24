# Part 3 – Programming a Server with Node.js

This folder contains my completed exercises for [Part 3](https://fullstackopen.com/en/part3) of the **Full Stack Open** course.

The focus of this part is building a **Node.js** + **Express** backend, connecting it to **MongoDB**, deploying it, and creating a production-ready full stack app.

---

## 📚 Covered Topics
### 🌐 Building a Backend

- Creating an Express server

- Defining REST API routes

- Handling JSON data and middleware

- Serving a React production build from the backend

### 🗄️ Working with MongoDB

- Connecting to MongoDB Atlas using Mongoose

- Creating schemas and models

- Validating data with Mongoose validators

- Using MongoDB query methods (find, save, update, delete)

### ⚙️ Deploying a Full Stack App

- Deploying backend to Render

- Serving the frontend build from `/dist`

- Setting environment variables (`MONGODB_URI`, `PORT`)

- Handling production vs. development behavior

### 🧰 Tooling

- Using Nodemon for automatic restarts

- Using ESLint for linting and code quality

- Using Morgan for HTTP request logging

---
## 📂 Projects

### 1. Phonebook Backend (Final Exercise 3.1–3.22)

A full backend for the [Phonebook](https://github.com/Kopiika/fullstack_open_course/tree/main/part2/phonebook) application built in **Part 2**.

**Deployed version:**
[https://fullstack-open-course-zqns.onrender.com](https://fullstack-open-course-zqns.onrender.com)

- REST API
- Validation with Mongoose
- Custom error handling
- Morgan logging
- Deployed to Render
- Serves the React build from the `dist/` folder

> A full breakdown and API documentation can be found in
**[phonebook-backend/README.md](./phonebook-backend/README.md)**.

---
## 🗂️ Folder Structure (Overview)
```bash
part3/
├── phonebook-backend/   # Full Node.js + Express + MongoDB project for the Phonebook app
└─ README.md
```
---
## 🚀 How to Run the Backend Locally

For full local setup instructions, see  
👉 **[phonebook-backend/README.md](./phonebook-backend/README.md)**.

## 📜 Notes

Part 3 connects everything learned so far:
frontend → backend → database → deployment.

It was my first hands-on experience with:

- real server code

- schemas and validation

- error handling in API routes

- reading production logs

- debugging deployment issues

- integrating frontend with a real database instead of JSON server

## 📜 License

This work follows the educational material from Full Stack Open 2024 and is intended for learning purposes only.
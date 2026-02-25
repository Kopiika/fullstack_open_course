# Blog List Frontend – Full Stack Open (Part 7)

This is the fully extended **Blog List** frontend, built as the main project for [Full Stack Open – Part 7](https://fullstackopen.com/en/part7).

It transforms the Part 5 single-page app into a complete **multi-view SPA** using React Router, Redux Toolkit for global state, and Material UI for styling.

The exercises covered are **7.9–7.21**.

### Related Projects

- **Backend (REST API):** [`bloglist-exercises/bloglist-backend`](../bloglist-backend/README.md)
- **Original frontend (Part 5):** [`part5/bloglist-frontend`](../../../part5/bloglist-frontend/)

---

## Features

- Multi-page SPA with React Router (blogs, individual blog, users, individual user, login)
- JWT authentication with `localStorage` persistence
- Create, like, delete, and comment on blogs
- Redux Toolkit store with four slices: blogs, notification, logged-in user, all users
- Styled throughout with Material UI (`Container`, `Button`, `TextField`, `AppBar`, `Table`)
- Component and integration tests (React Testing Library + Vitest)

---

## Project Structure

```
bloglist-frontend/
├── src/
│   ├── components/
│   │   ├── Blog.jsx             # Blog card with togglable details
│   │   ├── Blog.test.jsx        # Component tests for Blog
│   │   ├── BlogForm.jsx         # Create blog form
│   │   ├── BlogForm.test.jsx    # Component tests for BlogForm
│   │   ├── LoginForm.jsx        # Login form component
│   │   ├── Menu.jsx             # MUI AppBar navigation
│   │   ├── Notification.jsx     # Global notification banner
│   │   └── Togglable.jsx        # Show/hide wrapper component
│   │
│   ├── pages/
│   │   ├── BlogsPage.jsx        # List of all blogs + create form
│   │   ├── BlogView.jsx         # Individual blog detail + comments
│   │   ├── LoginPage.jsx        # Login page
│   │   ├── UserView.jsx         # Individual user's blogs
│   │   └── UsersPage.jsx        # Table of all users
│   │
│   ├── reducers/
│   │   ├── blogReducer.js       # Slice: fetch, create, like, delete, comment
│   │   ├── notificationReducer.js  # Timed notification with type (success/error)
│   │   ├── userReducer.js       # Slice: currently logged-in user
│   │   └── usersReducer.js      # Slice: all registered users
│   │
│   ├── services/
│   │   ├── blogs.js             # Axios: blog CRUD + comments
│   │   ├── login.js             # Axios: authentication
│   │   └── users.js             # Axios: fetch all users
│   │
│   ├── store.js                 # configureStore with all four reducers
│   ├── App.jsx                  # Router setup, auth init, layout
│   ├── main.jsx                 # Entry point, Redux Provider + Router
│   └── index.css
│
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## How It Works

### Routing

The app uses React Router with five routes:

| Path           | Page          | Description                        |
|----------------|---------------|------------------------------------|
| `/`            | `BlogsPage`   | List of all blogs + create form    |
| `/blogs/:id`   | `BlogView`    | Individual blog with comments      |
| `/users`       | `UsersPage`   | Table of all registered users      |
| `/users/:id`   | `UserView`    | Blogs created by a specific user   |
| `/login`       | `LoginPage`   | Login form                         |

### Redux Store

Four slices are combined in `store.js`:

| Slice          | Purpose                                          |
|----------------|--------------------------------------------------|
| `blogs`        | List of blogs, sorted by likes                   |
| `notification` | Current message + type (success / error)         |
| `user`         | The currently authenticated user (from localStorage) |
| `users`        | All registered users (for the Users view)        |

### Authentication

On login, the JWT token is saved to `localStorage`. On app startup, `App.jsx` reads it back and restores the session via `dispatch(setUser(...))` and `blogService.setToken(...)`.

### Testing

Component tests cover the `Blog` and `BlogForm` components using React Testing Library and Vitest:

- `Blog` — verifies title/author are shown by default, URL/likes are hidden until "view" is clicked
- `BlogForm` — verifies the create handler is called with the correct data on submit

Run tests:

```bash
npm test
```

---

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Make sure the backend is running (see [`bloglist-backend/README.md`](../bloglist-backend/README.md))

3. Start the frontend:

```bash
npm run dev
```

App available at: `http://localhost:5173`

---

## Development Tools

- **Vite** – build tool and dev server
- **React Router** – client-side routing (`react-router-dom`)
- **Redux Toolkit** – global state management (`createSlice`, `configureStore`)
- **React Redux** – `useSelector`, `useDispatch` hooks
- **Material UI** – component library (`@mui/material`, `@emotion`)
- **Axios** – HTTP client
- **Vitest** – test runner
- **React Testing Library** – component testing (`@testing-library/react`)
- **user-event** – simulating user interactions in tests
- **Prettier** – code formatting
- **ESLint** – linting

Run lint:

```bash
npm run lint
```

---

## Challenges I Faced

Working on this project helped me understand:

- How React Router transforms a flat SPA into a structured, navigable multi-view app
- Managing four interdependent Redux slices and keeping them in sync with the backend
- Restoring auth state on page reload by reading `localStorage` in `useEffect`
- How Material UI components replace custom CSS and speed up consistent styling
- Writing meaningful component tests that assert real user-visible behavior
- Passing typed notifications (success vs error) through Redux to display styled banners

---

## License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.

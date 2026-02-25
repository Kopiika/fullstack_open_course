# Part 7 – React Router, Custom Hooks & UI Libraries

This folder contains my completed exercises for [Part 7](https://fullstackopen.com/en/part7) of the **Full Stack Open** course.

This part focuses on **client-side routing** with React Router, building **custom React hooks**, using **UI component libraries** (Material UI), and extending the Blog List app into a full-featured, styled single-page application.

---

## Covered Topics

### React Router

- Setting up `BrowserRouter`, `Routes`, and `Route`
- Navigating programmatically with `useNavigate`
- Reading URL parameters with `useParams`
- Nested and protected routes

### Custom Hooks

- Extracting reusable logic into custom hooks
- `useField` – controlled input hook with reset support
- `useCountry` – data-fetching hook with loading and error state
- `useResource` – generic CRUD hook backed by Axios + json-server

### UI Libraries

- Styling with **Material UI** (`@mui/material`, `@emotion`)
- Using MUI components: `Container`, `Button`, `TextField`, `AppBar`, `Table`
- Integrating icon libraries (`@mui/icons-material`)

### Extended Blog List App

- Client-side routing with React Router (views for blogs, users, individual blog/user)
- Global state via Redux Toolkit (blogs, logged-in user, all users, notifications)
- JWT authentication persisted in `localStorage`
- Component and integration tests with React Testing Library + Vitest

---

## Projects

### 1. routed-anecdotes (Exercises 7.1–7.3)

The anecdote app extended with React Router and the `useField` custom hook.

- Client-side navigation between list, create, and about views
- Individual anecdote view via dynamic route (`/anecdotes/:id`)
- `useField` hook for controlled inputs with reset functionality
- Notification shown after creating a new anecdote

### 2. country-hook (Exercises 7.4–7.6)

A country search app demonstrating custom data-fetching hooks.

- `useField` hook for the search input
- `useCountry` hook that fetches country data from the REST Countries API
- Handles not-found and error states gracefully

### 3. ultimate-hooks (Exercise 7.7)

A minimal app demonstrating a fully generic `useResource` hook.

- `useResource(baseUrl)` – returns a resource list and a `create` service method
- Works with any resource type (persons, notes, etc.)
- Backed by `json-server` as a mock REST API

### 4. bloglist-exercises (Exercises 7.9–7.21)

A fully extended Blog List application — the main project of Part 7.

- **Frontend:** React + Vite, React Router, Redux Toolkit, Material UI
- **Backend:** Node.js + Express + MongoDB (from Part 4), extended with comments support
- Multi-page SPA: Blogs list, individual blog view, users list, individual user view
- JWT login with `localStorage` persistence
- Redux slices: blogs, notification, logged-in user, all users
- Styled throughout with Material UI components
- Component and integration tests (React Testing Library + Vitest)

---

## Folder Structure (Overview)

```bash
part7/
├── routed-anecdotes/    # Anecdote app with React Router + useField hook
├── country-hook/        # Country search with useField + useCountry hooks
├── ultimate-hooks/      # Generic useResource hook demo
├── bloglist-exercises/
│   ├── bloglist-frontend/   # Full SPA: Router + Redux + Material UI
│   └── bloglist-backend/    # REST API backend (Node.js + Express + MongoDB)
└── README.md
```

---

## How to Run Projects Locally

### routed-anecdotes

```bash
cd routed-anecdotes
npm install
npm run dev
```

### country-hook

```bash
cd country-hook
npm install
npm run dev
```

### ultimate-hooks

Start the mock backend and frontend in separate terminals:

```bash
cd ultimate-hooks
npm install

# Terminal 1 – mock REST API (port 3005)
npm run server

# Terminal 2 – frontend
npm run dev
```

### bloglist-exercises

Start the backend and frontend in separate terminals:

```bash
# Terminal 1 – backend (see bloglist-backend/README.md for .env setup)
cd bloglist-exercises/bloglist-backend
npm install
npm run dev

# Terminal 2 – frontend
cd bloglist-exercises/bloglist-frontend
npm install
npm run dev
```

To run frontend tests:

```bash
cd bloglist-exercises/bloglist-frontend
npm test
```

---

## Notes

Part 7 brought together everything covered in the course so far:

- **React Router** makes SPAs feel like real multi-page apps without server round-trips
- **Custom hooks** are the cleanest way to extract and share stateful logic across components
- **Material UI** dramatically speeds up building accessible, responsive interfaces
- The **bloglist-exercises** project is the most complete app in the course — combining routing, Redux, MUI, authentication, and testing in one codebase

---

## License

This work follows the educational material from Full Stack Open 2024 and is intended for learning purposes only.

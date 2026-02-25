# Routed Anecdotes – Full Stack Open (Part 7)

This project extends the Anecdotes app with **client-side routing** using React Router and a `useField` **custom hook** for controlled form inputs.

The exercises covered are **7.1–7.3**.

---

## Features

- Client-side navigation with React Router (`BrowserRouter`, `Routes`, `Route`)
- Three views: anecdote list, individual anecdote, create new anecdote, about
- Dynamic route for individual anecdotes (`/anecdotes/:id`) using `useParams`
- Programmatic navigation after form submission with `useNavigate`
- `useField` custom hook for controlled inputs with reset support
- Notification displayed after successfully creating a new anecdote

---

## Project Structure

```
routed-anecdotes/
├── src/
│   ├── hooks/
│   │   └── index.js       # useField custom hook
│   ├── App.jsx            # Router setup, all views and components
│   └── main.jsx           # Entry point
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

The app uses React Router to define four routes:

| Path               | View                                      |
|--------------------|-------------------------------------------|
| `/`                | `AnecdoteList` – list of all anecdotes    |
| `/anecdotes/:id`   | `Anecdote` – single anecdote detail view  |
| `/create`          | `CreateNew` – form to add an anecdote     |
| `/about`           | `About` – description page               |

### `useField(type)` Hook

Manages a controlled input's state and returns `{ type, value, onChange, reset }`.

The `reset` function is intentionally separated so it is not spread into `<input>` as an unknown DOM prop:

```js
const content = useField('text')
const { reset: resetContent, ...contentProps } = content
// <input {...contentProps} />
```

### Notification

After a new anecdote is created, a timed notification is shown at the top of the page.
It automatically clears after 5 seconds using `setTimeout`.

---

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

App available at: `http://localhost:5173`

---

## Development Tools

- **Vite** – build tool and dev server
- **React Router** – client-side routing (`react-router-dom`)
- **ESLint** – linting and code quality

Run lint:

```bash
npm run lint
```

---

## Challenges I Faced

Working on this project helped me understand:

- How React Router turns a single-page app into a multi-view experience without server reloads
- Using `useParams` to read dynamic route segments and find matching data
- Using `useNavigate` to redirect programmatically after a form submission
- Why hook return values must be destructured carefully before spreading into DOM elements
- How a simple `useField` hook eliminates repetitive controlled-input boilerplate

---

## License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.

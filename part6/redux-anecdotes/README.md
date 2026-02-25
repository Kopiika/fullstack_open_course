# Redux Anecdotes – Full Stack Open (Part 6)

This project is a full anecdote voting application built with **Redux Toolkit**.
It demonstrates multi-slice state management, async data fetching with thunks, filtering, and timed notifications.

The exercises covered are **6.3–6.19**.

---

## Features

- Redux store with three slices: anecdotes, filter, notification
- Create and vote on anecdotes (persisted to a mock REST API)
- Anecdotes sorted by votes in descending order
- Filter bar for searching anecdotes by content
- Timed notification that auto-clears after a configurable delay
- Async thunks for fetching, creating, and voting on anecdotes
- Reducer unit tests with Vitest and `deep-freeze`

---

## Project Structure

```
redux-anecdotes/
├── src/
│   ├── components/
│   │   ├── AnecdoteForm.jsx       # Form for adding new anecdotes
│   │   ├── AnecdoteList.jsx       # Sorted list of anecdotes with vote buttons
│   │   ├── Filter.jsx             # Search/filter input
│   │   └── Notification.jsx       # Notification banner
│   │
│   ├── reducers/
│   │   ├── anecdoteReducer.js     # Slice: create, vote, initialize anecdotes
│   │   ├── anecdoteReducer.test.js# Vitest tests for anecdote reducer
│   │   ├── filterReducer.js       # Reducer for filter string
│   │   └── notificationReducer.js # Slice: show/clear timed notifications
│   │
│   ├── services/
│   │   └── anecdotes.js           # Axios-based REST API service
│   │
│   ├── store.js                   # configureStore with all reducers
│   ├── App.jsx                    # Root component, initializes anecdotes
│   └── main.jsx                   # Entry point, wraps app in Redux Provider
│
├── db.json                        # Mock database for json-server
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## How It Works

### Redux Store

The store is configured using Redux Toolkit's `configureStore` with three reducers:

```js
{
  anecdotes: anecdoteReducer,        // list of anecdote objects
  filter: filterReducer,             // current search string
  notification: notificationReducer  // current notification message
}
```

### Anecdote Slice Actions

| Action            | Effect                                    |
|-------------------|-------------------------------------------|
| `setAnecdotes`    | Initializes the list from the backend     |
| `createAnecdote`  | Adds a new anecdote to the store          |
| `updateAnecdote`  | Replaces an anecdote (used after voting)  |

### Async Thunks

All backend communication is handled via async thunks:

- `initializeAnecdotes()` – fetches all anecdotes from the server on app load
- `appendAnecdote(content)` – creates a new anecdote and saves it to the server
- `voteAnecdote(anecdote)` – increments votes and persists the update

### Notification

The `showNotification(message, seconds)` thunk dispatches `setNotification` and schedules `clearNotification` after the given delay. A timeout guard prevents rapid triggers from stacking.

### Filter

The `filterChange(value)` action updates the filter string. `AnecdoteList` filters the visible anecdotes by checking if their content includes the current filter value.

### Testing

Reducer tests verify that actions produce the correct new state without mutating the original, using `deep-freeze`.

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

2. Start the mock backend (json-server on port 3001):

```bash
npm run server
```

3. In a separate terminal, start the frontend:

```bash
npm run dev
```

App available at: `http://localhost:5173`
Mock API available at: `http://localhost:3001/anecdotes`

---

## Development Tools

- **Vite** – build tool and dev server
- **Redux Toolkit** – simplified Redux setup (`createSlice`, `configureStore`)
- **React Redux** – `useSelector`, `useDispatch` hooks
- **json-server** – mock REST API backend
- **Vitest** – unit test runner
- **deep-freeze** – immutability enforcement in tests
- **ESLint** – linting and code quality

Run lint:

```bash
npm run lint
```

---

## Challenges I Faced

Working on this project helped me understand:

- How to split Redux state into multiple slices with `createSlice`
- Writing and dispatching async thunks for backend communication
- Keeping the Redux store in sync with the backend after mutations
- Managing timed side effects (auto-clear notifications) inside thunks
- Using `useSelector` to derive filtered and sorted views of state
- The difference between synchronous action creators and async thunks

---

## License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.

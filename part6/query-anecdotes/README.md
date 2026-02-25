# Query Anecdotes – Full Stack Open (Part 6)

This project rebuilds the anecdote app using **React Query (TanStack Query)** for server state management
and the **Context API + `useReducer`** for global UI state (notifications).
It replaces the Redux store entirely with a more focused, modern approach.

The exercises covered are **6.20–6.24**.

---

## Features

- Server state (anecdotes) managed with React Query (`useQuery`, `useMutation`)
- Automatic cache invalidation and refetching after mutations
- Create new anecdotes (minimum 5 characters enforced by the server)
- Vote on anecdotes (vote count persisted to the backend)
- Timed notification system using Context API and `useReducer`
- Error handling for failed requests (displayed as notifications)
- Loading state shown while fetching anecdotes
- Custom `json-server` backend with a content length validation rule

---

## Project Structure

```
query-anecdotes/
├── src/
│   ├── components/
│   │   ├── AnecdoteForm.jsx       # Form for creating anecdotes
│   │   └── Notification.jsx       # Reads notification from context
│   │
│   ├── NotificationContext.jsx    # Context + useReducer for notifications
│   ├── notificationService.js     # Helper: showNotification (dispatch wrapper)
│   ├── requests.js                # Fetch-based API functions (get / create / update)
│   ├── App.jsx                    # Main component with useQuery + useMutation
│   └── main.jsx                   # Entry point, wraps app in QueryClient + NotificationContextProvider
│
├── server.js                      # Custom json-server with content length validation
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

### Server State – React Query

All anecdote data is treated as **server state** and managed entirely by React Query:

- `useQuery({ queryKey: ['anecdotes'], queryFn: getAnecdotes })` – fetches and caches anecdotes on mount
- `useMutation({ mutationFn: createAnecdote })` – creates a new anecdote and invalidates the cache on success
- `useMutation({ mutationFn: updateAnecdote })` – increments votes and triggers a refetch

Cache invalidation ensures the UI always reflects the latest server data after any mutation:

```js
queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
```

### API Endpoints (json-server)

| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| GET    | `/anecdotes`       | Fetch all anecdotes   |
| POST   | `/anecdotes`       | Create a new anecdote |
| PUT    | `/anecdotes/:id`   | Update an anecdote    |

The custom `server.js` adds a validation rule rejecting anecdotes shorter than 5 characters with a `400` error.

### UI State – Context API + useReducer

Notifications are managed globally with a dedicated context:

- `NotificationContext` provides `{ notification, notificationDispatch }` to the whole app
- `NotificationReducer` handles `SET_NOTIFICATION` and `CLEAR_NOTIFICATION` actions
- `showNotification(dispatch, message, seconds)` dispatches a message and schedules auto-clear with `setTimeout`

Components read the notification via `useContext(NotificationContext)` — no Redux needed.

### Error Handling

If the server rejects a request (e.g. content too short), the `onError` callback in `useMutation` dispatches an error notification to the context, which is displayed to the user.

---

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Start the custom json-server backend (port 3001):

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
- **TanStack React Query** – server state management (`useQuery`, `useMutation`)
- **React Context API + useReducer** – global notification state
- **json-server** – mock REST API backend with custom validation
- **ESLint** – linting and code quality

Run lint:

```bash
npm run lint
```

---

## Challenges I Faced

Working on this project helped me understand:

- The difference between **server state** (React Query) and **UI state** (Context / Redux)
- How React Query's caching eliminates the need to manually store fetched data in Redux
- Using `invalidateQueries` to keep the UI in sync after mutations
- Building a lightweight global state solution with `useContext` + `useReducer` as a Redux alternative
- Handling server-side validation errors gracefully in `useMutation` callbacks
- When to reach for React Query vs Redux: server data → React Query, complex client logic → Redux

---

## License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.

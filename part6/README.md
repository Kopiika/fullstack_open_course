# Part 6 – Advanced State Management

This folder contains my completed exercises for [Part 6](https://fullstackopen.com/en/part6) of the **Full Stack Open** course.

The focus of this part is **advanced state management** in React applications using **Redux**, **Redux Toolkit**, and **React Query (TanStack Query)**, as well as the **Context API** with the `useReducer` hook.

---

## Covered Topics

### Redux & Redux Toolkit

- Setting up a Redux store
- Writing reducers with `createSlice`
- Dispatching actions and reading state with `useSelector` / `useDispatch`
- Combining multiple reducers
- Immutability and pure functions in reducers
- Testing reducers with Vitest

### Async Redux with Redux Thunk

- Fetching data from a backend inside action creators
- Using `json-server` as a mock REST API
- Dispatching async thunks with Redux Toolkit

### React Query (TanStack Query)

- Fetching and caching server state with `useQuery`
- Mutating data with `useMutation`
- Invalidating and refetching queries
- Separating server state from UI state

### Context API + useReducer

- Managing global state without Redux using `useContext` and `useReducer`
- Creating a custom context provider
- Dispatching actions through context

---

## Projects

### 1. unicafe-redux (Exercises 6.1–6.2)

A Redux-powered version of the Unicafe feedback app from Part 1.

- Redux store with a pure reducer
- Actions for `GOOD`, `OK`, `BAD`, and `ZERO`
- Reducer tested with `deep-freeze` to ensure immutability

### 2. redux-anecdotes (Exercises 6.3–6.19)

A full anecdote voting app built with Redux Toolkit.

- Redux store with multiple slices: anecdotes, filter, notification
- Async data fetching and persistence via `json-server`
- Vote counting and sorting
- Filter bar for searching anecdotes
- Timed notification system
- Reducer unit tests with Vitest

### 3. query-anecdotes (Exercises 6.20–6.24)

The anecdote app rebuilt using React Query and the Context API.

- Server state managed entirely with TanStack Query (`useQuery`, `useMutation`)
- Global notification state managed via `useContext` + `useReducer`
- Optimistic UI updates and cache invalidation
- Custom `json-server` backend (`server.js`)

---

## Folder Structure (Overview)

```bash
part6/
├── unicafe-redux/       # Redux reducer & store for the Unicafe feedback app
├── redux-anecdotes/     # Anecdote app with Redux Toolkit + async thunks
├── query-anecdotes/     # Anecdote app with React Query + Context API
└── README.md
```

---

## How to Run Projects Locally

### unicafe-redux

```bash
cd unicafe-redux
npm install
npm run dev
```

### redux-anecdotes

Start the mock backend and the frontend in separate terminals:

```bash
cd redux-anecdotes
npm install

# Terminal 1 – mock REST API
npm run server

# Terminal 2 – frontend
npm run dev
```

To run reducer tests:

```bash
npm test
```

### query-anecdotes

```bash
cd query-anecdotes
npm install

# Terminal 1 – mock backend
npm run server

# Terminal 2 – frontend
npm run dev
```

---

## Notes

Part 6 introduced the most important patterns for managing state in large-scale React apps:

- **Redux / Redux Toolkit** for complex, shared UI state with predictable updates
- **React Query** for server state — caching, refetching, and synchronization
- **Context + useReducer** as a lightweight Redux alternative for smaller scopes

The key insight is knowing *which* tool to reach for: React Query owns server state, Redux owns complex client state, and Context covers simple global needs.

---

## License

This work follows the educational material from Full Stack Open 2024 and is intended for learning purposes only.

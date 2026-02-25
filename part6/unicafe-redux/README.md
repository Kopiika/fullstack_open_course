# Unicafe Redux – Full Stack Open (Part 6)

This project is my Redux implementation of the **Unicafe** feedback app, originally built in Part 1.
It replaces local component state with a centralized **Redux store** managed by a pure reducer.

The exercises covered are **6.1–6.2**.

---

## Features

- Redux store created with `createStore`
- Pure reducer handling four action types: `GOOD`, `OK`, `BAD`, `RESET`
- UI re-renders by subscribing to store changes (`store.subscribe`)
- Immutability enforced and verified with `deep-freeze`
- Reducer fully tested with Vitest

---

## Project Structure

```
unicafe-redux/
├── src/
│   ├── reducers/
│   │   ├── counterReducer.js        # Pure reducer with GOOD / OK / BAD / RESET actions
│   │   └── counterReducer.test.js   # Vitest unit tests for the reducer
│   └── main.jsx                     # Redux store setup + React UI
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

### State Shape

The Redux store holds a single object:

```js
{
  good: 0,
  ok: 0,
  bad: 0
}
```

### Actions

| Action type | Effect                      |
|-------------|-----------------------------|
| `GOOD`      | Increments `good` by 1      |
| `OK`        | Increments `ok` by 1        |
| `BAD`       | Increments `bad` by 1       |
| `RESET`     | Resets all counters to `0`  |

### Re-rendering

Instead of React state, the app subscribes directly to the Redux store:

```js
store.subscribe(renderApp)
```

Every dispatched action triggers a full re-render of the `App` component.

### Testing

Unit tests verify every action type and the initial state, using `deep-freeze` to ensure the reducer never mutates state directly.

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

2. Start the development server:

```bash
npm run dev
```

App available at: `http://localhost:5173`

---

## Development Tools

- **Vite** – build tool and dev server
- **Redux** – state management
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

- How Redux manages state outside of React component state
- Writing pure reducers that return new state without mutation
- Using `deep-freeze` to catch accidental mutations during tests
- How `store.subscribe` can drive re-renders as an alternative to `useState`

---

## License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.

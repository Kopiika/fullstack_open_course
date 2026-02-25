# Ultimate Hooks – Full Stack Open (Part 7)

This project demonstrates a fully **generic `useResource` custom hook** that abstracts all CRUD communication with a REST backend for any resource type.

The exercise covered is **7.7**.

---

## Features

- `useField` hook — controlled input state management (value, onChange, reset)
- `useResource(baseUrl)` — generic data-fetching and creation hook for any REST resource
- Two independent resources managed simultaneously: **notes** and **persons**
- Backed by `json-server` as a mock REST API

---

## Project Structure

```
ultimate-hooks/
├── src/
│   ├── hooks/
│   │   ├── useField.js       # Controlled input hook
│   │   └── useResource.js    # Generic REST resource hook
│   ├── App.jsx               # Notes and persons forms + lists
│   └── main.jsx              # Entry point
│
├── db.json                   # Mock database for json-server (notes + persons)
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## How It Works

### `useResource(baseUrl)`

A generic hook that manages a list of resources from a given REST endpoint:

```js
const [notes, noteService] = useResource('http://localhost:3005/notes')
const [persons, personService] = useResource('http://localhost:3005/persons')
```

- On mount, it fetches all resources from `baseUrl` using Axios
- Returns a tuple: `[resources, service]`
  - `resources` — the current array of items
  - `service.create(resource)` — POSTs a new item and appends it to state

### `useField(type)`

Returns `{ type, value, onChange }` for a controlled `<input>` and a separate `reset` to clear the value.

### App Usage

The same hook instance handles two completely different resource types (notes and persons) without any resource-specific logic:

```js
noteService.create({ content: content.value })
personService.create({ name: name.value, number: number.value })
```

---

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Start the mock backend (json-server on port 3005):

```bash
npm run server
```

3. In a separate terminal, start the frontend:

```bash
npm run dev
```

App available at: `http://localhost:5173`
Mock API available at: `http://localhost:3005/notes` and `http://localhost:3005/persons`

---

## Development Tools

- **Vite** – build tool and dev server
- **Axios** – HTTP client for REST requests
- **json-server** – mock REST API backend
- **ESLint** – linting and code quality

Run lint:

```bash
npm run lint
```

---

## Challenges I Faced

Working on this project helped me understand:

- How to design a truly generic hook that works for any REST resource
- Returning a tuple `[data, service]` from a hook as a clean API pattern
- How `useEffect` with a `baseUrl` dependency ensures the correct resource is fetched
- That the same hook logic can power completely unrelated data types simultaneously

---

## License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.

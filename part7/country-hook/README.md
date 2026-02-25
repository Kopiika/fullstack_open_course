# Country Hook – Full Stack Open (Part 7)

This project demonstrates building **custom React hooks** for controlled inputs and data fetching.
The app lets a user search for a country by name and displays its details fetched from a public REST API.

The exercises covered are **7.4–7.6**.

---

## Features

- `useField` hook — manages controlled input state (value, onChange, reset)
- `useCountry` hook — fetches country data from the REST Countries API on demand
- Handles loading, not-found, and error states gracefully
- Displays country name, capital, population, and flag

---

## Project Structure

```
country-hook/
├── src/
│   ├── hooks/
│   │   ├── useField.js       # Controlled input hook (value, onChange, reset)
│   │   └── useCountry.js     # Data-fetching hook for the REST Countries API
│   ├── App.jsx               # Search form + Country display component
│   └── index.jsx             # Entry point
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

### `useField(type)`

Returns a controlled input object `{ type, value, onChange }` and a separate `reset` function.
The `reset` is intentionally destructured out before spreading into `<input>` to avoid passing an unknown DOM prop.

```js
const nameInput = useField('text')
const { reset, ...inputProps } = nameInput
// <input {...inputProps} />
```

### `useCountry(name)`

Runs a `useEffect` whenever `name` changes. Fetches from:

```
https://studies.cs.helsinki.fi/restcountries/api/name/{name}
```

Returns one of three states:

| Return value        | Meaning                        |
|---------------------|--------------------------------|
| `null`              | No search submitted yet        |
| `{ found: false }`  | Country not found (404 / error)|
| `{ found: true, data }` | Country data loaded        |

### Search Flow

1. User types a country name and submits the form
2. The name is stored in local state and passed to `useCountry`
3. `useCountry` fetches the API and returns the result
4. The `Country` component renders the result or an appropriate message

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
- **React** – UI library
- **ESLint** – linting and code quality

Run lint:

```bash
npm run lint
```

---

## Challenges I Faced

Working on this project helped me understand:

- How custom hooks encapsulate both state and side effects in one reusable unit
- Why `reset` must be destructured before spreading a hook's return value into an `<input>`
- How to represent multi-state async results (null / not-found / found) cleanly
- The difference between a hook that manages UI state (`useField`) and one that manages server state (`useCountry`)

---

## License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.

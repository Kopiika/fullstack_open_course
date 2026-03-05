# BMI Exercises – Full Stack Open (Part 9)

This project contains my completed exercises for the introductory section of [Part 9](https://fullstackopen.com/en/part9) of the **Full Stack Open** course.

This part introduces **TypeScript** with Node.js, covering type annotations, interfaces, type guards, and building a typed Express REST API.

---

## Covered Topics

- TypeScript basics: types, interfaces, and type annotations
- Running TypeScript with `ts-node` and `ts-node-dev`
- CLI argument parsing with type safety
- Building a typed Express HTTP server
- Input validation and error handling in a typed context
- ESLint configured for TypeScript (`typescript-eslint`)

---

## Exercises

### Exercises 9.1–9.3 – BMI Calculator (CLI)

A command-line tool that calculates BMI from height (cm) and weight (kg).

- Takes two CLI arguments: height and weight
- Returns a BMI category string (`Underrange`, `Normal range`, `Overrange`, `Obese`)
- Validates that inputs are present and numeric

Run:

```bash
npm run calculateBmi -- 180 74
```

### Exercises 9.4–9.5 – Exercise Calculator (CLI)

A command-line tool that analyses a week of training data against a daily target.

- Takes a target (hours/day) and an array of daily exercise hours as CLI arguments
- Returns a `Result` object with: period length, training days, average, success status, and a 1–3 rating with description

Run:

```bash
npm run calculateExercises -- 2 1 0 2 4.5 0 3 1
```

### Exercises 9.6 – ESLint for TypeScript

ESLint configured with `typescript-eslint` and `@stylistic/eslint-plugin` for consistent code style across all TypeScript files.

Run lint:

```bash
npm run lint
```

### Exercises 9.7 – Express REST API

An Express server exposing typed HTTP endpoints for both calculators.

| Method | Endpoint      | Description                                      |
|--------|---------------|--------------------------------------------------|
| GET    | `/`           | Health check – returns a greeting string         |
| GET    | `/bmi`        | Calculates BMI from `height` and `weight` query params |
| POST   | `/exercises`  | Analyses exercise data from JSON body            |

#### `GET /bmi` example

```
GET http://localhost:3003/bmi?height=180&weight=72
```

Response:

```json
{
  "height": 180,
  "weight": 72,
  "bmi": "Normal range"
}
```

#### `POST /exercises` example

```
POST http://localhost:3003/exercises
Content-Type: application/json

{
  "daily_exercises": [1, 0, 2, 4.5, 0, 3, 1],
  "target": 2
}
```

Response:

```json
{
  "periodLength": 7,
  "trainingDays": 5,
  "success": false,
  "rating": 2,
  "ratingDescription": "Good",
  "target": 2,
  "average": 1.6428571428571428
}
```

---

## Project Structure

```
bmi-exercises/
├── bmiCalculator.ts        # BMI calculation logic + CLI entry point
├── exerciseCalculator.ts   # Exercise analysis logic + CLI entry point
├── index.ts                # Express server with /bmi and /exercises routes
├── eslint.config.mjs       # ESLint config (typescript-eslint + stylistic)
├── tsconfig.json           # TypeScript compiler options
├── package.json
└── README.md
```

---

## How to Run

### Install dependencies

```bash
npm install
```

### Start the Express server

```bash
# Production (ts-node)
npm start

# Development (auto-reload)
npm run dev
```

Server runs at: `http://localhost:3003`

### Run CLI tools directly

```bash
npm run calculateBmi -- <height> <weight>
npm run calculateExercises -- <target> <day1> <day2> ...
```

---

## Development Tools

- **TypeScript** – static typing for Node.js
- **ts-node** – execute TypeScript directly without compiling
- **ts-node-dev** – auto-reload dev server for TypeScript
- **Express 5** – HTTP server framework
- **ESLint** – linting with `typescript-eslint` and `@stylistic/eslint-plugin`

---

## License

This project is part of the **Full Stack Open course** exercises and is intended for **learning purposes only**.

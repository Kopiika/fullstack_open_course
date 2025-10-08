# Anecdotes – Full Stack Open (Part 1)

This project is my solution to the **“Anecdotes”** exercise from [Full Stack Open – Part 1](https://fullstackopen.com/en/part1).

The app displays a **random programming anecdote**, lets users **vote** for their favorite anecdotes, and highlights the anecdote with the **most votes**.

---

## 🚀 Features
- Displays a random anecdote from a predefined list
- **Vote** button to increment the vote count of the currently displayed anecdote
- **Next anecdote** button to display another random anecdote
- Dynamically shows:
  - The number of votes for the current anecdote
  - The anecdote with the highest votes
- Uses **React functional components** and **hooks** (`useState`) to manage state

---

## 📝 Code Overview
Key elements:
- `App` – manages state:
  - `selected` – index of the currently displayed anecdote
  - `votes` – array storing the votes for each anecdote
- `Button` – reusable button component for user interactions
- Logic for selecting a random anecdote and updating votes
- Displays both the current anecdote and the anecdote with the most votes

Entry point:
```javascript
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
````
---
## 💻 Running the App
1. Clone the repository and navigate to the `anecdotes` folder:
	```bash
	git clone fullstack_open_course
	cd part1/anecdotes
	```
2. Install dependencies:
	```bash
	npm install
	````
3. Start the development server:
	```bash
	npm start
	````
4. Open http://localhost:3000 to view the app.

### 🛠️ Requirements

- Node.js >= 18
- npm >= 9
---
## 🌱 Challenges I Faced as a React Beginner

While developing this project, I encountered several learning challenges:

1. **Managing arrays in state:**
I had to learn how to store votes in an array (votes) and update it without mutating the original state.
Understanding how to copy the array with [...votes] before modifying it was crucial.

2. **Generating random indices:**
Picking a random anecdote with Math.random() and ensuring it always stayed within array bounds was a new concept in a React app.

3. **Calculating the anecdote with the most votes:**
Using Math.max() and indexOf() to find the top anecdote required careful thinking about how to derive values from the state array.

4. **Component reuse:**
Creating a reusable Button component to avoid repeating JSX helped me better understand how to make components general-purpose.

5. **Data flow and re-rendering:**
It was enlightening to see how React automatically re-renders components when the state changes — but I had to make sure I updated the state immutably.

These challenges helped me strengthen my understanding of state management, array operations, and React’s rendering cycle.


## 📜 License

This project is part of the Full Stack Open course exercises and is intended for learning purposes only.
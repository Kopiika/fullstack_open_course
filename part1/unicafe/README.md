# Unicafe – Full Stack Open (Part 1)

This project is my solution to the **“Unicafe”** exercise from [Full Stack Open – Part 1](https://fullstackopen.com/en/part1).

The application allows users to give feedback to a café by selecting **good**, **neutral**, or **bad** options.  
It calculates and displays key statistics, including the **total number of ratings**, **average score**, and **percentage of positive feedback**.

---

## 🚀 Features
- Three feedback buttons: **Good**, **Neutral**, and **Bad**
- Displays statistics in a table:
  - Total number of feedbacks
  - Average score
  - Percentage of positive feedback
- Shows a message *“No feedback given”* when no feedback is submitted yet
- Uses **functional components** and **React hooks** (`useState`) for state management
- Separates UI into reusable components: `Button`, `Statistics`, and `StatisticLine`

---

## 📝 Code Overview
Main components:
- `App` – stores all state (feedback counts and allClicks array) and renders the UI
- `Button` – reusable button component for feedback options
- `Statistics` – calculates and renders all statistics or displays a placeholder message
- `StatisticLine` – renders a single statistic row inside a table

Entry point:
```javascript
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```
---
## 💻 Running the App
 1. Clone the repository and navigate to the `unicafe` folder:
	```bash
	git clone fullstack_open_course
	cd part1/unicafe
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

---
### 🛠️ Requirements
- Node.js >= 18
- npm >= 9

---
## 🌱 Challenges I Faced as a React Beginner
While building this project, I ran into several challenges that helped me grow as a React developer:

1. **Managing multiple pieces of state:**
I had to track separate counters for good, neutral, and bad feedback, as well as maintain an array (allClicks) for calculating the average score.
It was tricky at first to update multiple states without mistakes.

2. **Understanding how to calculate statistics** dynamically:
Using reduce() to compute the sum and then deriving the average and percentage of positive feedback inside a component was new to me.

3. **Conditional rendering:**
Implementing the “No feedback given” message required learning how to show different UI based on state.

4. **Reusability of components:**
Separating the StatisticLine component to avoid repetitive JSX helped me understand why reusable components are important.

5. **Working with JSX inside tables:**
Embedding components within <table> rows and understanding when to use <tbody> and <tr> taught me how JSX translates to HTML structure.

Each of these challenges deepened my understanding of stateful components and data flow in React.

## 📜 License

This project is part of the Full Stack Open course exercises and is intended for learning purposes only.
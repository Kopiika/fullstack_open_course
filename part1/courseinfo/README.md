# Course Info – Full Stack Open (Part 1)

This project is my solution to the **“Course Info”** exercise from [Full Stack Open – Part 1](https://fullstackopen.com/en/part1).

The application displays a course name, the names and number of exercises in each part of the course, and the **total number of exercises**.  
It was built as one of the first steps in learning **React**.

---

## 🚀 Features
- Displays the course title using a reusable **Header** component.
- Renders all course parts dynamically using **Content** and **Part** components.
- Calculates and displays the **total number of exercises** using `Array.reduce()`.
- Uses **props** to pass data between components.
- Demonstrates splitting UI into small, reusable **functional components**.

---

## 📝 Code Overview
Main components:
- `Header` – renders the course name.
- `Part` – displays a single part’s name and exercises.
- `Content` – maps through the list of parts and renders each `Part`.
- `Total` – calculates the sum of exercises with `reduce`.
- `App` – defines the `course` object and brings all components together.

Entry point:
```javascript
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
````
---
## 💻 Running the App
 1. Clone the repository and navigate to the `courseinfo` folder:
	```bash
	git clone fullstack_open_course
	cd part1/courseinfo
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
While working on this project, I encountered several learning challenges:

1. **Understanding props:**
Passing data from App down to child components felt confusing at first.
I had to learn that props are read-only and passed like HTML attributes.

2. **Mapping through arrays:**
Rendering multiple parts with map() was new to me.
I learned how to use the key prop to avoid React warnings.

3. **Calculating totals with reduce():**
Using array methods inside JSX looked intimidating at first, but it turned out to be very powerful.

4. **Component structure & data flow:**
Deciding what data belongs in which component took some practice.
It helped me understand the “top-down data flow” in React.

5. **JSX syntax gotchas:**
Remembering to use curly braces {} for embedding JavaScript expressions in JSX took a bit of trial and error.

These challenges were part of the learning curve, and overcoming them gave me a stronger foundation in React.

---
## 📜 License

This project is part of the Full Stack Open course exercises and is intended for learning purposes only.
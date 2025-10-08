# Course Info – Full Stack Open (Part 2)

This project is my solution to the **“Course Info”** exercise from [Full Stack Open – Part 2](https://fullstackopen.com/en/part2).

The application displays information about multiple programming courses and their parts.  
It demonstrates **component-based architecture** in React and how to use **props** to pass data between components.

---

## 🚀 Features
- Renders a list of courses and their parts
- Displays:
  - **Course name**
  - **Part names** with the number of exercises for each part
  - **Total number of exercises** for each course
- Uses **JavaScript’s `reduce()`** to calculate the total exercises
- Separates the logic into reusable components:
  - `Course` (parent component)
  - `Header`, `Content`, `Part`, and `Total` (subcomponents)
- Fully functional using **React hooks** and **props**

---

## 🗂️ Project Structure

```
src/
├─ App.jsx # Main component that holds courses array
├─ components/
│ └─ Course.jsx # Handles rendering a single course and its parts
└─ main.jsx # Entry point for rendering the App
```

---
## 💻 Running the App

1. Clone the repository and navigate to the **`courseinfo`** folder:
	```bash
	git clone fullstack_open_course
	cd part2/courseinfo
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Start the development server:
	```bash
	npm run dev
	```
4. Open the app in your browser at the URL provided by Vite (usually http://localhost:5173
).

---
### 🛠️ Requirements

- Node.js ≥ 18

- npm ≥ 9

- Modern web browser

---

🌱 Challenges I Faced as a React Beginner

Working on Course Info taught me several fundamental concepts and challenges:

1. **Breaking the UI into reusable components:**
At first, it was tricky to decide how to structure the app into smaller pieces. Splitting logic into Header, Content, Part, and Total helped me understand component hierarchy.

2. **Passing data with props:**
I had to learn how to pass the entire course object down to child components and extract only the data needed by each one.

3. **Using array methods inside components:**
Mapping over course.parts to render multiple Part components and using reduce() to calculate the total exercises strengthened my understanding of JavaScript in React.

4. **Keys for dynamic lists:**
I learned why each rendered part needs a unique key prop to avoid warnings and ensure efficient rendering.

5. **Thinking in React:**
This project introduced me to the React mindset: stateful parent components and stateless child components that receive data through props.

These challenges helped me build a strong foundation in React component design, props, and data rendering.

## 📜 License

This project is part of the Full Stack Open course exercises and is intended for educational purposes only.


---


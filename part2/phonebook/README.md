# Phonebook – Full Stack Open (Part 2)

This project is my solution to the **“Phonebook”** exercises from [Full Stack Open – Part 2](https://fullstackopen.com/en/part2).

The Phonebook app lets users:
- Add new contacts (name + number)
- Update an existing contact’s number
- Filter the list of contacts by name
- Delete contacts
- Receive **success** or **error notifications**
- Persist data on a backend server (default: `http://localhost:3001/persons`)

The UI is styled with **CSS** defined in `index.css`.

---

## 🚀 Features
- **CRUD operations** (Create, Read, Update, Delete) for contacts
- Search/filter contacts by name (case-insensitive)
- Inline **notifications** for success or error actions
- Automatic updates after add/update/delete operations
- Modular code structure:
  - `components/` → `Filter`, `PersonForm`, `PersonsList`, `Person`, `Notification`
  - `services/persons.js` → all **Axios** API calls
- Graceful error handling when a record has been removed from the server

---

## 🗂️ Project Structure
```
src/
├─ components/
│ ├─ Filter.jsx
│ ├─ Notification.jsx
│ ├─ Person.jsx
│ ├─ PersonForm.jsx
│ └─ PersonsList.jsx
├─ services/
│ └─ persons.js # Axios helper for API calls
├─ App.jsx # Main component
├─ index.css # Global styling
└─ main.jsx # App entry point
```
---
## 📝 How It Works
- **App.jsx** loads initial data from the backend using `useEffect` and `personServices.getAll()`.
- Adding or updating a contact triggers a POST or PUT request to the backend.
- Deleting a contact triggers a DELETE request and updates the UI.
- Notifications show success or error messages, disappearing automatically after 5 seconds.
- Filtering is done on the client side by updating `filterText` state.
---
## 💻 Running the App

1. Clone the repository and navigate to the **`phonebook`** folder:
```bash
git clone <your-repo-url>
cd part2/phonebook
```
2. Install dependencies:
	```bash
	npm install
	```
3. Start the frontend:
	```bash
	npm start
	````
4. Make sure you have the backend (JSON Server or your own API) running on http://localhost:3001/persons.
For testing with JSON Server:
	```bash
	npx json-server --port 3001 --watch db.json
	```
5. Open http://localhost:3000
 in the browser.

---
### 🛠️ Requirements

- Node.js ≥ 18

- npm ≥ 9

- A running backend API at http://localhost:3001/persons

---
## 🌱 Challenges I Faced as a React Beginner

Building this app introduced me to more advanced concepts compared to Part 1:

1. **Handling asynchronous API calls with Axios:**
I learned how to fetch data with useEffect and chain .then() to update state, as well as handle errors from the server.

2. **Managing multiple components and lifting state:**
Splitting the UI into Filter, PersonForm, and PersonsList was initially challenging but clarified how data flows top-down from App.jsx.

3. **Updating existing records:**
Implementing the logic to detect if a contact already exists and prompting the user to update their number was tricky.

4. **Error handling & notifications:**
Displaying different styles for success and error notifications, and clearing them after a delay, required learning how to manage transient UI state.

5. **Synchronizing client and server state:**
Ensuring that the UI stayed consistent after a contact was removed or updated on the server taught me about optimistic updates and re-fetching data.

6. **CSS styling with index.css:**
Organizing styles for form fields, buttons, and notifications helped me understand component-driven styling.

These challenges strengthened my understanding of React hooks, state management, and client-server communication.

## 📜 License

This project is part of the Full Stack Open course exercises and is intended for learning purposes only.
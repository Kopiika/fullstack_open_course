# Countries – Full Stack Open (Part 2)

This project is my solution to the **“Countries”** exercises from [Full Stack Open – Part 2](https://fullstackopen.com/en/part2).

The application lets users:
- Search for countries by name
- View details for each country (capital, area, population, languages, and flag)
- Display live **weather information** for the country’s capital (via the [OpenWeatherMap API](https://openweathermap.org/api))
- Toggle between showing and hiding details for selected countries

The project also includes **custom CSS styling** in `index.css`.

---

## 🚀 Features
- Fetches a full list of countries from the [REST Countries API](https://restcountries.com/)
- Client-side filtering by user input
- Shows a country’s flag, capital, area, population, and spoken languages
- Integrates weather data using **OpenWeatherMap API** (temperature, wind speed, and weather icon)
- Displays messages when:
  - More than 10 matches are found (`"Too many matches, specify another filter"`)
  - No matches are found (`"No matches found"`)
- Responsive UI styled with **CSS** (`index.css`)
- Modular code structure with **functional components** and **React hooks**

---

## 🗂️ Project Structure

```
src/
├─ components/
│ ├─ CountriesList.jsx
│ ├─ Country.jsx
│ └─ Filter.jsx
│ 
├─ App.jsx # Main component
├─ index.css # Global styling
└─ main.jsx # App entry point
```

## 🔑 Environment Variables
To fetch weather data, you need an **OpenWeatherMap API key**.  
Create a `.env` file in the project root and add:
```bash
VITE_SOME_KEY=your_openweathermap_api_key
````
> Make sure to restart the development server after editing `.env`.
---
## 💻 Running the App

1. Clone the repository and navigate to the **`countries`** folder:
	```bash
	git clone fullstack_open_course
	cd part2/countries
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Add your OpenWeatherMap API key to .env as shown above.
4. Start the development server:
	```bash
	npm run dev
	````
5. Open the app at the URL provided by Vite (usually http://localhost:5173).

### 🛠️ Requirements

- Node.js ≥ 18

- npm ≥ 9

- Active internet connection (for APIs)

- An OpenWeatherMap API key

---
## 🌱 Challenges I Faced as a React Beginner

Building this project introduced new concepts that were more complex than previous exercises:

1. **Fetching data from multiple APIs:**
I had to fetch country data from the REST Countries API and then, for each selected country, fetch weather data from the OpenWeatherMap API.
Managing these asynchronous requests with useEffect was challenging at first.

2. **Handling nested and conditional rendering:**
Displaying detailed info only for the selected country and toggling it with the Show/Hide button required careful state management.

3 **Dealing with missing or nested properties:**
Some countries didn’t have certain fields (like missing capital), so I had to use optional chaining (e.g., country.capital?.[0]) to avoid runtime errors.

4. **Environment variables with Vite:**
Setting up and using import.meta.env.VITE_SOME_KEY for the weather API key was a new concept for me.

5. **Client-side filtering and performance:**
Learning how to filter the countries array in real time as the user typed in the search input improved my understanding of React’s state updates and re-rendering.

6. **Styling dynamic components:**
Applying consistent styles for the country cards, flags, and weather sections in index.css helped me practice structuring styles for reusable components.

These challenges helped me strengthen my understanding of React hooks, state management, conditional rendering, and working with external APIs.

## 📜 License

This project is part of the Full Stack Open course exercises and is intended for learning purposes only.


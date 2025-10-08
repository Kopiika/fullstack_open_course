import { useEffect, useState } from "react"
import axios from "axios"
/* Component to display a single country */
const Country = ({ country }) => {
	const [weather, setWeather] = useState(null);
	const api_key = import.meta.env.VITE_SOME_KEY
 
	useEffect(() => {
	  if (!country.capital) return
		 const capital = country.capital[0];
		 axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
			.then(response => {
			  setWeather(response.data);
			})
			.catch(error => {
			  console.error("Failed to fetch weather data", error);
			});
		 }, [country, api_key]);
 
	return (
	  <div className='countryCard'>
		 <h3>{country.name.common}</h3>
		 <div className="countryInfo">
			<div className="countryDetails">
			  <p><span>Capital:</span> {country.capital?.[0]}</p>
			  <p><span>Area:</span> {country.area} km²</p>
			  <p><span>Population:</span> {country.population}</p>
			  <p><span>Languages:</span> {Object.values(country.languages).join(', ')}</p>
			</div>
			<div className="flagContainer">
			  <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" className="flagImage"/>
			</div>
		 </div>
		 {weather && (
			<div className="weatherInfo">
			  <h4>Weather in {country.capital[0]}</h4>
			  <p><span>Temperature:</span> {weather.main.temp} °C</p>
			  <p><span>Wind:</span> {weather.wind.speed} m/s</p>
			  <img 
				 src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
				 alt={weather.weather[0].description} 
				 title={weather.weather[0].description} 
			  />
			</div>
		 )}
	  </div>
	)
 }

 export default Country
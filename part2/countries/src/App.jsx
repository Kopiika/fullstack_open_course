import { useEffect, useState } from "react"
import axios from "axios"
import './index.css'
import Filter from './components/Filter'
import CountriesList from './components/CountriesList'


const App = () => {
  const [countries, setCountries] = useState([]); // all countries (obtained from API)
  const [filterText, setFilterText] = useState('');// текст з input
  const [shownCountry, setShownCountry] = useState(null); // country to show in detail

  /* useEffect to load initial data from the server */
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=name,flags,area,languages,population,region,capital,cca3')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch initial data from server", error);
      });
  }, []);

  /* Function to handle filter text change */
  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleShowCountry = (country) => {
    setShownCountry(country);
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filterText.trim().toLowerCase())
  );

    return (
    <>
    <div className="mainContainer">
      <h1>Data of Countries</h1>
      <Filter filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
      {filterText && <CountriesList 
          countries={filteredCountries} 
          handleShowCountry={handleShowCountry} 
          shownCountry={shownCountry}/>
      } 
    </div>  
    </>
  )
}


export default App

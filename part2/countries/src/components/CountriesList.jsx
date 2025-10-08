import Country from './Country'
/* Component to display the list of countries */
const CountriesList = ({ countries, shownCountry, handleShowCountry }) => {
	if (countries.length > 10) {
	  return <p>Too many matches, specify another filter</p>
	}
	if (countries.length === 0) {
	  return <p>No matches found</p>
	}
	if (countries.length === 1) {
	  return (
		 <div className='countriesListContainer'>
			{countries.map((country) => (
			  <Country key={country.cca3} country={country} />))}
		 </div>
	)}
	return (
	  <ul className='countriesList'>
		 {countries.map((country) => (
			<li key={country.cca3}>{country.name.common} 
			  <button onClick={() => handleShowCountry(
				 shownCountry?.cca3 === country.cca3 ? null : country)}>
				 {shownCountry?.cca3 === country.cca3 ? "Hide" : "Show detail"}
			  </button>
			  {shownCountry?.cca3 === country.cca3 && <Country country={country} />}
			</li>
		 ))}
	  </ul>
	)
	
	
 }

export default CountriesList
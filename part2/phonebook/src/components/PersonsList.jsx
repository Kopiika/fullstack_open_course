import Person from "./Person"
/* Component to display the list of persons */
const PersonsList = ({persons, removePerson})=>{
	return (
	  <ul className='personsList'>
			{persons.map((person) => (
			  <Person key={person.id} person={person} removePerson={removePerson} />
			))}
	  </ul>
	)
 }

 export default PersonsList
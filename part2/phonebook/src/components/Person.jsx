/* Component to display a single person with a delete button */
const Person = ({ person, removePerson }) => {
	return (
	<li className='personItem'>
	  <div className='personInfo'>
		 <span className='personName'>{person.name}</span> 
		 <span>{person.number}</span> 
	  </div>
	  <button className='delPersonBtn btn' onClick={() => removePerson(person.id)}>delete</button>
	</li>
 )}

 export default Person
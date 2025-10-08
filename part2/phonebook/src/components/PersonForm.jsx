/* Form component to add a new person */
const PersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
	return (
	  <form className='addPersonForm' onSubmit={addPerson}>
			<div className='formField'>
			<label>Name:</label> <input value={newName} onChange={handleNameChange}/>
			</div>
			<div className='formField'>
			<label>Number:</label> <input value={newNumber} onChange={handleNumberChange}/>
			</div>
			<div className='containerBtn'>
			  <button className='btn addPesonBtn' type="submit">add</button>
			</div>
		 </form>
	)
 }

 export default PersonForm
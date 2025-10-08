/* Filter component to filter the list of persons */
const Filter =({filterText, handleFilterTextChange}) =>{
	return (
	  <div className='filterInput'>
			<label>Filter shown with:</label> <input value={filterText} onChange={handleFilterTextChange}/>
	  </div>
	)
 }

export default Filter
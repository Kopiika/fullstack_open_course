/* Filter component to filter the list of countries */
const Filter = ({ filterText, handleFilterTextChange }) => {
  return (
	 <div className='filterInput'>
		<label>Filter shown with:</label>
		<input value={filterText} onChange={handleFilterTextChange} placeholder="Country's name" />
	 </div>
  )
}

export default Filter
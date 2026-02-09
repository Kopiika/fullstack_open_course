// a method for fetching data from the backend
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  //Error handling
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  //convert the response to json
  return await response.json()
}

//createNew method for adding a new blog to the backend
const createNew = async (content) => {
	const options ={
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ content, votes: 0 }),
	 }

	const response = await fetch(baseUrl, options)
	
	if (!response.ok) {
	  throw new Error('Failed to create anecdote')
	}
	
	return await response.json()
 }

 const update = async (anecdote) => {
	const options = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(anecdote),
	 }
	 
	const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

	if (!response.ok) {
	  throw new Error('Failed to update anecdote')
	}

	return await response.json()
 }

export default { getAll , createNew, update }
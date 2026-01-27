import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

 const addAnecdote = async (event) => {
	  event.preventDefault()
	  const content = event.target.anecdote.value
	  event.target.anecdote.value = ''
	  const newAnecdote = await anecdoteService.createNew(content)
     dispatch(createAnecdote(newAnecdote))
	  dispatch(showNotification(`You created a new anecdote: "${content}"`))
	}

  return (
	<form onSubmit={addAnecdote}>
	<h2>Create new anecdote</h2>
	<div>
	  <input name="anecdote" />
	</div>
	<button type="submit">create</button>
 </form>
  )
}

export default AnecdoteForm
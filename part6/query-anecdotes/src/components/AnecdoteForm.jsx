const AnecdoteForm = ({ onCreate }) => {
  const onCreateHandler = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    onCreate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreateHandler}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

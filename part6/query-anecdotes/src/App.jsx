import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'
import { showNotification } from './notificationService'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })
  
  const { notificationDispatch } = useContext(NotificationContext)


  const addAnecdote = (content) => {
      newAnecdoteMutation.mutate(
        { content, votes: 0 },
        {
          onSuccess: (newAnecdote) => {
            showNotification(notificationDispatch, `Anecdote '${newAnecdote.content}' created!`, 5)
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
          },
          onError: (error) => {
            showNotification(notificationDispatch, `Error: ${error.message}`, 5)
          }
        }
      )
  }

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    showNotification(notificationDispatch, `You voted '${anecdote.content}'`, 5)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    //retry: 1
  })
 
  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to server problems</div>
  }
 
  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onCreate={addAnecdote}/>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

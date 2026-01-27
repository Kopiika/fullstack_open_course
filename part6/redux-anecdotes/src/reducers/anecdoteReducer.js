import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

/*

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  //initialState: anecdotesAtStart.map(asObject),
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    giveVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      console.log(current(state))
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { createAnecdote, giveVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
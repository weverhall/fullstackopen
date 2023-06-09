import { createSlice } from '@reduxjs/toolkit'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(anecdote =>
        anecdote.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      const updatedAnecdotes = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
      return updatedAnecdotes.sort((a, b) => b.votes - a.votes)
    },
    addAnecdote(state, action) {
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, addAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export default anecdotesSlice.reducer
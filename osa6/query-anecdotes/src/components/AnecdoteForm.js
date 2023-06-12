import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.invalidateQueries('anecdotes', anecdotes.concat(newAnecdote))
  },
    onError: () => {
      dispatch({ type: 'SHOW', payload: 'anecdote must be at least 5 characters long' })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 5000)
    }
  })

  const submitAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
  }

  return (
    <>
      <h3>Create new</h3>
      <form onSubmit={submitAnecdote}>
        <input name='anecdote' /> <button type="submit">create</button>
      </form>
      <p></p>
    </>
  )
}

export default AnecdoteForm

import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.invalidateQueries('anecdotes', anecdotes.concat(newAnecdote))
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

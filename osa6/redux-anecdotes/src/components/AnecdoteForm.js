import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createNewAnecdote}>
        <input name='anecdote'/> <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createNewAnecdote(content)
    dispatchMessage(content)
    event.target.anecdote.value = ''
  }

  const createNewAnecdote = (content) => {
    dispatch(addAnecdote(content))
  }

  const dispatchMessage = (content) => {
    dispatch(setNotification('created anecdote: ', content, 5))
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={submitAnecdote}>
        <input name='anecdote' /> <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
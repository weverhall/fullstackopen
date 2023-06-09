import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote =>
      (anecdote.content.toLowerCase().includes(filter.toLowerCase())))
  })

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatchMessage(content)
  }

  const dispatchMessage = (content) => {
    const message = 'voted anecdote: '
    dispatch(createNotification({ message, content }))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <>
      {anecdotesList.map(anecdote =>
        <div key={anecdote.id} style={style}>
            {anecdote.content}
          <div>
            has {anecdote.votes} votes {''}
            <button onClick={() => 
              vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Anecdotes
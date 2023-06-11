import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotesList = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter(anecdote =>
        (anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      )
      .sort((a, b) =>
        b.votes - a.votes || a.content.localeCompare(b.content)
      )
  })

  const submitVote = (anecdote) => {
    vote(anecdote)
    dispatchMessage(anecdote.content)
  }

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
  }

  const dispatchMessage = (content) => {
    dispatch(setNotification('voted anecdote: ', content, 5))
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
            <button onClick={() => submitVote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Anecdotes
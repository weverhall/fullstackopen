import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes =>
        dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <>
      <Notification />
      <h1>Anecdotes</h1>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App
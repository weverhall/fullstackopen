import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
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
import { useQuery, useMutation, useQueryClient } from 'react-query' 
import { getAnecdotes, updateVote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateVoteMutation = useMutation(updateVote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.invalidateQueries('anecdotes')

      if (updatedAnecdote) {
        queryClient.setQueryData('anecdotes', anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        ))
      }
    }
  })

  const handleVote = async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await updateVoteMutation.mutateAsync(updatedAnecdote)
    await dispatch({ type: 'SHOW', payload: `voted anecdote "${anecdote.content}"`})
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  if ( result.isLoading ) { return <>loading data...</> }
  if ( result.isError ) { return <>anecdote service not available due to problems in server</> }

  const anecdotes = result.data

  return (
    <div>
      <h1>Anecdote app</h1>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes {''}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

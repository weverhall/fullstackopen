import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleFilterChange = (event) => {
    dispatch(changeFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <b>Filter </b>
      <input onChange={handleFilterChange} />
    </div>
  )
}

export default AnecdoteFilter
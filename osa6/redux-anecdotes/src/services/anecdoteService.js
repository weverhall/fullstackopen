import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const id = getId()
  const votes = 0
  const object = { id, content, votes }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default {
  getAll,
  createNew
}
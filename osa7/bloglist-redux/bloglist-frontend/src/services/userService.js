let token = null

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }
  return null
}

const setUser = (user) => {
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  token = user.token
}

const clearUser = () => {
  window.localStorage.clear()
  token = null
}

const getToken = () => token

export default { setUser, getUser, clearUser, getToken }

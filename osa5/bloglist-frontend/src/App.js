import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (err) {
        setError(true)
        setMessage('error fetching blogs')
        clearMessageTimeout()
      }
    }  
    fetchData()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const clearMessageTimeout = () => {
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
        ) 
      setUser(user)
      setUsername('')
      setPassword('')
      setError(false)
      setMessage(`successfully logged in as ${user.name}`)
      clearMessageTimeout()

    } catch (err) {
      setError(true)
      setMessage('invalid credentials')
      clearMessageTimeout()
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      setError(false)
      setMessage(`successfully logged out ${user.name}`)
      clearMessageTimeout()

    } catch (err) {
      setError(true)
      setMessage(`error in attempting to log out ${user.name}`)
      clearMessageTimeout()
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setError(false)
      setMessage(`added new blog "${newBlog.title}" by ${newBlog.author}`)
      clearMessageTimeout()

    } catch (err) {
      setError(true)
      setMessage('error in attempting to add blog')
      clearMessageTimeout()
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} error={error} />

        <h2>log in to application</h2>

        <Login username={username} password={password} 
        setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} error={error} />

      <h1>blogs</h1>

      <p>logged in as <i>{user.name}</i><br></br>
      <button onClick={handleLogout}>log out</button></p>

      <h2>create new</h2>

      <BlogForm addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl}
       handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
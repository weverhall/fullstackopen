import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = React.createRef()

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
    }, 3500)
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
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setError(false)
      setMessage(`successfully logged in as ${user.name}`)

    } catch (err) {
      setError(true)
      setMessage('invalid credentials')
    }
    clearMessageTimeout()
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      setError(false)
      setMessage(`successfully logged out ${user.name}`)

    } catch (err) {
      setError(true)
      setMessage(`error in attempting to log out ${user.name}`)
    }
    clearMessageTimeout()
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setError(false)
      setMessage(`added new blog "${newBlog.title}" by ${newBlog.author}`)

    } catch (err) {
      setError(true)
      setMessage(`${err.response.data.error}`)
    }
    clearMessageTimeout()
  }

  const removeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`remove "${blog.title}" by ${blog.author}?`)) {

      try {
        await blogService.remove(blog)
        setError(false)
        setMessage(`successfully removed "${blog.title}"`)
        setBlogs(blogs.filter(blog => blog.id !== id))

      } catch (err) {
        setError(true)
        setMessage(`"${blog.title}" has already been removed`)
      }
      clearMessageTimeout()
    }
  }

  const likeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(likedBlog)
      returnedBlog.user = likedBlog.user
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))

    } catch (err) {
      setError(true)
      setMessage('error in attempting to like blog')
      clearMessageTimeout()
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  blogs.sort((a, b) => a.likes - b.likes).reverse()

  return (
    <div>
      <Notification message={message} error={error} />

      {user === null
        ?
        <div>
          <h2>blogs application login</h2>

          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin} />
        </div>
        :
        <div>
          <h2>blogs application</h2>

          <p>logged in as <i>{user.name} </i>
            <button onClick={handleLogout}>log out</button></p>
          {blogForm()}<br></br>

          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const notification = useSelector(({ notification }) => notification)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (err) {
        dispatch(setNotification('error fetching blogs', true, 4))
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification(`successfully logged in as ${user.name}`, false, 4))
    } catch (err) {
      dispatch(setNotification('invalid credentials', true, 4))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      dispatch(setNotification(`successfully logged out ${user.name}`, false, 4))
    } catch (err) {
      dispatch(setNotification(`error in attempting to log out ${user.name}`, true, 4))
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      dispatch(setNotification(`added new blog "${newBlog.title}" by ${newBlog.author}`, false, 4))
    } catch (err) {
      dispatch(setNotification(`${err.response.data.error}`, true, 4))
    }
  }

  const removeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (window.confirm(`remove "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.remove(blog)
        dispatch(setNotification(`successfully removed "${blog.title}"`, false, 4))
        setBlogs(blogs.filter((blog) => blog.id !== id))
      } catch (err) {
        dispatch(setNotification(`"${blog.title}" might have already been removed`, true, 4))
      }
    }
  }

  const likeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(likedBlog)
      returnedBlog.user = likedBlog.user
      dispatch(setNotification(`successfully liked "${blog.title}"`, false, 4))
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    } catch (err) {
      dispatch(setNotification('error in attempting to like blog', true, 4))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  blogs.sort((a, b) => a.likes - b.likes).reverse()

  return (
    <div>
      <Notification notification={notification} />

      {user === null ? (
        <div>
          <h2>blogs application login</h2>

          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs application</h2>

          <p>
            logged in as <i>{user.name} </i>
            <button onClick={handleLogout}>log out</button>
          </p>
          {blogForm()}
          <br></br>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App

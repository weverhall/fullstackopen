import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import loginService from './services/loginService'
import BlogView from './components/views/BlogView'
import LoginView from './components/views/LoginView'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, deleteBlog, addLike } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const notification = useSelector(({ notification }) => notification)
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const blogFormRef = React.createRef()

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      await dispatch(loginUser(user))
      dispatch(setNotification(`successfully logged in as ${user.name}`, false, 4))
    } catch (error) {
      dispatch(setNotification('invalid credentials', true, 4))
    }
  }

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser())
      dispatch(setNotification(`successfully logged out ${user.name}`, false, 4))
    } catch (error) {
      dispatch(setNotification(`error in attempting to log out ${user.name}`, true, 4))
    }
  }

  const handleBlogAdd = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      await dispatch(addBlog(blog))
      dispatch(setNotification(`added new blog "${blog.title}" by ${blog.author}`, false, 4))
    } catch (error) {
      dispatch(setNotification(`${error.response.data.error}`, true, 4))
    }
  }

  const handleBlogRemove = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    if (window.confirm(`remove "${blog.title}" by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(id))
        dispatch(setNotification(`successfully removed "${blog.title}"`, false, 4))
      } catch (error) {
        dispatch(setNotification(`"${blog.title}" might have already been removed`, true, 4))
      }
    }
  }

  const handleBlogLike = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    try {
      await dispatch(addLike(blog))
      dispatch(setNotification(`successfully liked "${blog.title}"`, false, 4))
    } catch (error) {
      dispatch(setNotification('error in attempting to like blog', true, 4))
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      {
        user === null
          ?
          <LoginView handleLogin={handleLogin} />
          :
          <BlogView
            user={user}
            blogs={blogs}
            blogFormRef={blogFormRef}
            handleLogout={handleLogout}
            handleBlogAdd={handleBlogAdd}
            handleBlogRemove={handleBlogRemove}
            handleBlogLike={handleBlogLike}
          />
      }
    </div>
  )
}

export default App

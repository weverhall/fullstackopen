import React from 'react'
import Togglable from '../Togglable'
import BlogForm from '../BlogForm'
import Blog from '../Blog'

const BlogView = ({
  user,
  blogs,
  blogFormRef,
  handleLogout,
  handleBlogAdd,
  handleBlogRemove,
  handleBlogLike
}) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes || a.title.localeCompare(b.title))

  return (
    <div>
      <h2>blogs application</h2>
      <p>
        logged in as <i>{user.name} </i>
        <button onClick={handleLogout}>log out</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleBlogAdd} />
      </Togglable>
      <br />

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={handleBlogLike}
          removeBlog={handleBlogRemove}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogView

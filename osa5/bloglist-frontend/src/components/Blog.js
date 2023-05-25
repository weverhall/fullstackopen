import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [viewAll, setViewAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = (event) => {
    event.preventDefault()
    likeBlog(blog.id)
  }

  const handleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog.id)
  }

  const toggleView = () => {
    setViewAll(!viewAll)
  }

  return (
    <div style={blogStyle} className='blog'>
      {viewAll
        ?
        <div>
          {blog.title} - {blog.author} <button
            onClick={toggleView}>hide</button><br></br>
          {blog.url}<br></br>
          {blog.likes} <button
            onClick={handleLike}>like</button><br></br>
          {blog.user.name}<br></br>
          {blog.user.username === user.username ?
            <button
              onClick={handleRemove}>remove</button> :
            <p></p>}
        </div>
        :
        <div>
          {blog.title} - {blog.author} <button
            onClick={toggleView}>view</button><br></br>
        </div>
      }
    </div>
  )}

export default Blog
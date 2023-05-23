import React from 'react'

const BlogForm = (props) => (
  <form onSubmit={props.addBlog}>
    title: <input value={props.newTitle} onChange={props.handleTitleChange} />
    <br></br>

    author: <input value={props.newAuthor} onChange={props.handleAuthorChange} />
    <br></br>

    url: <input value={props.newUrl} onChange={props.handleUrlChange} />
    <br></br>

    <button type="submit">create</button>
    <p></p> 
  </form>
)

export default BlogForm
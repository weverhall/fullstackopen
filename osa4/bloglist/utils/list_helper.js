const _ = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) =>
      sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  const all = blogs.map(blog => blog.likes)
  const favourite = blogs.find(blog => blog.likes === Math.max.apply(null, all))
  const { title, author, likes } = favourite
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const blogAuthors = _.orderBy(_.groupBy(blogs, 'author'), 'length', 'desc')[0]
  return (
    {
      author: blogAuthors[0].author,
      blogs: blogAuthors.length }
  )
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _(blogs).groupBy('author')
  const authorTotalLikes = blogsByAuthor.map((blogs, author) => ({
    author,
    likes: blogs.reduce((sum, blog) => {
      return sum + blog.likes
    }, 0)
  }
  ))
  const ordered = authorTotalLikes.orderBy('likes')
  const sorted = ordered.value()
  return _.last(sorted)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
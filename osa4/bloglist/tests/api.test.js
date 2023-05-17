const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs', async() => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('new blog can be added', async() => {
  const testBlog = {
    title: 'brandNewBlog',
    author: 'W',
    url: 'https://bitbucket.org/',
    likes: 1
  }
  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)

  const finalTitles = finalBlogs.map(n => n.title)
  expect(finalTitles).toContain('brandNewBlog')
})

test('blog can be updated', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const testBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(testBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length)

  const updatedBlog = finalBlogs.find(blog => blog.id === blogToUpdate.id)
  expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
})

test('blog can be deleted with valid id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length - 1)

  const finalTitles = finalBlogs.map(n => n.title)
  expect(finalTitles).not.toContain(blogToDelete.title)
})

test('blogs are unaffected when deleting with invalid id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete('/api/blogs/6461ee8900ced179b828987123')
    .expect(400)

  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(helper.initialBlogs.length)

  const finalTitles = finalBlogs.map(n => n.title)
  expect(finalTitles).toContain(blogToDelete.title)
})

test('blog likes set to zero if likes property missing', async() => {
  const testBlog = {
    title: 'blogWithoutLikes',
    author: 'W',
    url: 'https://about.gitlab.com/'
  }
  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const finalBlogs = await helper.blogsInDb()
  const blogWithoutLikes = finalBlogs.find(blog => blog.likes === 0)
  expect(blogWithoutLikes.likes).toBe(0)
})

test('blog without url gives bad request error', async() => {
  const testBlog = {
    title: 'blogWithoutUrl',
    author: 'W',
    likes: 4
  }
  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(400)
})

test('blog without title gives bad request error', async() => {
  const testBlog = {
    author: 'W',
    url: 'https://github.com/',
    likes: 123
  }
  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
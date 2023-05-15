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
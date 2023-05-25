import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  const testUser = {
    username: 'testUsername',
    name: 'testName'
  }

  const testBlog = {
    title: 'Nice Blog',
    author: 'Eric Andre',
    url: 'www.timheidecker.com',
    likes: 10,
    user: testUser
  }

  test('only title and author rendered by default', () => {
    const { container } = render(<Blog blog={testBlog} />)
    const element = container.querySelector('.blog')

    expect(element).toHaveTextContent('Nice Blog')
    expect(element).toHaveTextContent('Eric Andre')
    expect(element).not.toHaveValue(10)
    expect(element).not.toHaveTextContent('www.timheidecker.com')
  })

  test('clicking view button renders all fields', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={testBlog} toggleView={mockHandler} user={testUser} />)

    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)

    const title = screen.getByText('Nice Blog', { exact: false })
    const author = screen.getByText('Eric Andre', { exact: false })
    const url = screen.getByText('www.timheidecker.com', { exact: false })
    const likes = screen.getByText('10', { exact: false })
    const name = screen.getByText('testName', { exact: false })

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(name).toBeDefined()
  })

  test('clicking like button twice calls event handler twice', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={testBlog} likeBlog={mockHandler} user={testUser} />)

    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const like = screen.getByText('like')
    await user.dblClick(like)

    expect(mockHandler).toBeCalledTimes(2)
  })
})

describe('<BlogForm />', () => {
  test('blog form calls event handler correctly to create new blog', async () => {
    const createBlog = jest.fn()
    const component = render(<BlogForm createBlog={createBlog} />)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    const user = userEvent.setup()
    await user.type(title, 'Nice Blog')
    await user.type(author, 'Eric Andre')
    await user.type(url, 'www.timheidecker.com')
    const submit = screen.getByText('create')
    await user.click(submit)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual(
      { title: 'Nice Blog', author: 'Eric Andre', url: 'www.timheidecker.com' }
    )
  })
})
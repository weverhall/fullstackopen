import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    username: 'weverhall',
    name: 'Everhall'
  }

  const blog = {
    title: 'Nice Blog',
    author: 'Eric Andre',
    url: 'www.coolblog.org',
    likes: 10,
    user: { user }
  }

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} likeBlog={mockHandler} />
    )
  })

  test('only title and author rendered by default', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(blog.likes)
  })

  test('clicking view button renders all fields', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('clicking like button twice calls event handler twice', () => {
    fireEvent.click(component.getByText('view'))
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
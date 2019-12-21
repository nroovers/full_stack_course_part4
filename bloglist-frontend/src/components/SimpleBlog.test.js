/* eslint-disable indent */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
    const blog = {
        title: 'blog title',
        author: 'Nicolai',
        likes: 5
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    // component.debug()

    expect(component.container).toHaveTextContent('blog title Nicolai')
    expect(component.container).toHaveTextContent('blog has 5 likes')
})

test('fires button click event', () => {
    const blog = {
        title: 'blog title',
        author: 'Nicolai',
        likes: 5
    }

    const mockHandler = jest.fn()

    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})
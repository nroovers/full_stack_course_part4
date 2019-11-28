/* eslint-disable indent */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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

    expect(component.container).toHaveTextContent('blog title Nicolai')
    expect(component.container).toHaveTextContent('blog has 5 likes')
})
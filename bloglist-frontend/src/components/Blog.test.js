/* eslint-disable indent */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


const user = {
    username: 'userx',
    name: 'Nicolai Roovers'
}
const blog = {
    title: 'blog title',
    author: 'Nicolai',
    likes: 5,
    url: 'http://google.com',
    user: user
}

test('renders simple content by default', () => {

    const component = render(
        <Blog user={user} blog={blog} handleLikeClick={() => { }} handleRemoveClick={() => { }} />
    )

    // component.debug()

    expect(component.container).toHaveTextContent('blog title [Nicolai]')
    expect(component.container).not.toHaveTextContent('5 likes')
    expect(component.container).not.toHaveTextContent('http://google.com')
})


test('renders details after title click event', () => {

    const component = render(
        <Blog user={user} blog={blog} handleLikeClick={() => { }} handleRemoveClick={() => { }} />
    )

    const div = component.getByText('blog title [Nicolai]')
    fireEvent.click(div)

    expect(component.container).toHaveTextContent('blog title [Nicolai]')
    expect(component.container).toHaveTextContent('5 likes')
    expect(component.container).toHaveTextContent('http://google.com')
})

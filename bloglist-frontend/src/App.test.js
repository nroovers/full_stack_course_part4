/* eslint-disable indent */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')



const user = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJYIiwiaWQiOiI1ZGRhNzJhY2ViMTYzNjEyYzAxNDRlZmMiLCJpYXQiOjE1NzQ5NTE4MDF9.-AkhxzbugMgGOHbngTEuSEQ7CLZm2kKbv6kDS7apcuw',
    username: 'userX',
    name: 'Zwarte Piet'
}


describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('login')
        )

        expect(component.container).toHaveTextContent('username')
        expect(component.container).toHaveTextContent('password')
        expect(component.container).not.toHaveTextContent('blogs')
    })


    test('if user logged, blogs are rendered', async () => {

        localStorage.setItem('loggedUser', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('blogs')
        )

        expect(component.container).not.toHaveTextContent('username')
        expect(component.container).not.toHaveTextContent('password')
        expect(component.container).toHaveTextContent('blogs')

        const blogs = component.container.querySelectorAll('.blog')

        expect(blogs.length).toBe(3)
        expect(component.container).toHaveTextContent('Travel blog')
    })

})
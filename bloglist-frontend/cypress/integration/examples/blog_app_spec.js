{/* <reference types="Cypress" /> */ }

describe('Login', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    // // it('Page loads', function () {
    // //     cy.contains('blogs')
    // //     cy.contains('Login')
    // // })

    it('Login works', function () {
        cy.get('[data-cy=username]').type('nroovers')
        cy.get('[data-cy=password]').type('wachtwoord')
        cy.get('[data-cy=submit]').click()
        cy.contains('Nicolai Roovers logged in')
    })

    it('Login faild with wrong credentials', function () {
        cy.get('[data-cy=username]').type('nroovers')
        cy.get('[data-cy=password]').type('xxx')
        cy.get('[data-cy=submit]').click()
        cy.contains('Wrong username or password')
    })
})

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Nicolai Roovers',
            username: 'nroovers',
            password: 'wachtwoord'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.get('[data-cy=username]').type('nroovers')
        cy.get('[data-cy=password]').type('wachtwoord')
        cy.get('[data-cy=submit]').click()
    })

    // it('App loads', function () {
    //     cy.contains('Blogs')
    // })

    // it('Users page loads', function () {
    //     cy.wait(2000)
    //     cy.get('[data-cy=users-link]').click()
    //     cy.contains('Users')
    // })

    it('Create blog and comment', function () {
        cy.wait(2000)
        cy.get('[data-cy=new-note]').click()

        cy.get('input[name=title]').type('Blog Title')
        cy.get('input[name=author]').type('Blog Author')
        cy.get('input[name=url]').type('http://www.blog.url')
        cy.get('button[type=submit]').click()

        cy.contains('Blog Title - Blog Author')


        cy.request('http://localhost:3000/api/blogs').then(function (response) {
            cy.log(response.body[0].id)
            const blogId = response.body[0].id
            cy.wait(2000)
            cy.visit('http://localhost:3000/blogs/' + blogId)
            cy.contains('http://www.blog.url')

            cy.get('[data-cy=like-btn]').click()
            cy.contains('1 likes')

            cy.get('[data-cy=comment-field]').type('this is a comment')
            cy.get('[data-cy=add-comment-btn]').click()
            cy.wait(2000)
            cy.contains('this is a comment')

        })
    })

})

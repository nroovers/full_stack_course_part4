{/* <reference types="Cypress" /> */ }

describe('Login', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    // it('Page loads', function () {
    //     cy.contains('blogs')
    //     cy.contains('Login')
    // })

    it('Login works', function () {
        cy.get('[data-cy=username]').type('userY')
        cy.get('[data-cy=password]').type('Passw0rd1')
        cy.get('[data-cy=submit]').click()
        cy.contains('Sinterklaas logged in')
    })

    it('Login faild with wrong credentials', function () {
        cy.get('[data-cy=username]').type('userY')
        cy.get('[data-cy=password]').type('wrong password')
        cy.get('[data-cy=submit]').click()
        cy.contains('Wrong username or password')
    })
})

describe('Blog app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.get('[data-cy=username]').type('userY')
        cy.get('[data-cy=password]').type('Passw0rd1')
        cy.get('[data-cy=submit]').click()
    })

    it('App loads', function () {
        cy.contains('Blogs')
    })

    it('Users page loads', function () {
        cy.wait(2000)
        cy.get('[data-cy=users-link]').click()
        cy.contains('Users')
    })
})

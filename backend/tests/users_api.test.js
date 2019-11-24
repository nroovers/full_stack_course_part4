const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const testhelper = require('./test_helper')

const api = supertest(app)

const initialUsers = testhelper.initialUsers

beforeEach(async () => {
    await testhelper.initiateUsers()
})

describe('Users API POST', () => {

    test('creation of new user succeeds with username', async () => {
        const usersAtStart = await api.get('/api/users')

        const newUser = {
            username: 'nroovers',
            name: 'Nicolai Roovers',
            password: 'geheim',
        }

        const savedUser = await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // console.log('Saved user', savedUser.body)

        const usersAtEnd = await api.get('/api/users')
        // console.log('usersAtStart', usersAtStart.body, 'usersAtEnd', usersAtEnd.body)

        expect(usersAtEnd.body.length).toBe(usersAtStart.body.length + 1)

        const usernames = usersAtEnd.body.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('user must have valid username', async () => {
        let newUser = {
            name: 'Nicolai Roovers',
            password: 'geheim',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        // console.log(response)
        expect(response.body.error).toBe('username missing')

        newUser.username = 'nr'

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await api.get('/api/users')
        // console.log('usersAtEnd', usersAtEnd.body)
        expect(usersAtEnd.body.length).toBe(initialUsers.length)
    })

    test('username must be unique', async () => {
        let newUser = {
            name: 'root',
            password: 'geheim',
        }

        await api.post('/api/users').send(newUser).expect(400)

        const usersAtEnd = await api.get('/api/users')
        expect(usersAtEnd.body.length).toBe(initialUsers.length)
    })

    test('user must have valid password', async () => {
        let newUser = {
            username: 'nroovers',
            name: 'Nicolai Roovers'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(response.body.error).toBe('password missing')

        newUser.password = 'nr'

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await api.get('/api/users')
        expect(usersAtEnd.body.length).toBe(initialUsers.length)
    })

})


afterAll(() => {
    mongoose.connection.close()
})
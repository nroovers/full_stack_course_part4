const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    { username: 'root', password: 'sekret' }
]

beforeEach(async () => {
    await User.deleteMany({})
    // console.log('users collection cleared')
    const userObjects = initialUsers.map(user => new User(user))
    const userPromises = userObjects.map(user => {
        // console.log(user)
        user.save()
    })
    await Promise.all(userPromises)
    // console.log('initial users saved')
})

describe('Users API POST', () => {

    test('creation of new user succeeds with username', async () => {
        const usersAtStart = await api.get('/api/users')

        const newUser = {
            username: 'nroovers',
            name: 'Nicolai Roovers',
            password: 'geheim',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await api.get('/api/users')
        expect(usersAtEnd.body.length).toBe(usersAtStart.body.length + 1)

        const usernames = usersAtEnd.body.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
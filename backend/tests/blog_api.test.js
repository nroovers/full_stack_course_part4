const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testhelper = require('./test_helper')

const api = supertest(app)

const initialBlogs = testhelper.initialBlogs

beforeEach(async () => {
    await testhelper.initiateUsers()
    await testhelper.initiateBlogs()
})


describe('api GET', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are three blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(3)
    })

    test('a blog about travel should exist', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.map(b => b.title)).toContain('Travel blog')
    })

    test('the first blog has the id property defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
        expect(response.body[0]._id).not.toBeDefined()
    })
})

describe('api POST', () => {

    const newBlog = {
        title: "New blog",
        author: "Hanna",
        url: "http://www.newkidsontheblog.com",
        likes: 1
    }

    test('saved blog has the same title', async () => {
        const response = await api.post('/api/blogs').send(newBlog)

        expect(response.body.title).toBe("New blog")
    })

    test('new blog added to the database', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(initialBlogs.length + 1)
        expect(response.body.map(b => b.title)).toContain('New blog')
    })

    test('post sets likes to zero if not defined', async () => {
        const blogWithoutLikes = {
            title: "New blog",
            author: "Hanna",
            url: "http://www.newkidsontheblog.com"
        }

        const response = await api.post('/api/blogs').send(blogWithoutLikes)
        expect(response.body.likes).toBe(0)
    })

    test('no title throws 400 error', async () => {
        const blogWithoutTitle = {
            author: "Hanna",
            url: "http://www.newkidsontheblog.com"
        }

        await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
    })

    test('no url throws 400 error', async () => {
        const blogWithoutUrl = {
            title: "New blog",
            author: "Hanna"
        }

        await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
    })
})


describe('api DELETE', () => {

    test('confirm post is deleted', async () => {

        let getResponse = await api.get('/api/blogs')
        expect(getResponse.body.length).toBe(3)

        const blogToDelete = getResponse.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        getResponse = await api.get('/api/blogs')
        expect(getResponse.body.length).toBe(2)

        expect(getResponse.body).not.toContain(blogToDelete.title)
    })

})

describe('api PUT', () => {

    test('confirm post is updated by title', async () => {

        let getResponse = await api.get('/api/blogs')
        expect(getResponse.body.length).toBe(3)

        const blogToUpdate = getResponse.body[0]

        blogToUpdate.title = 'A new title'

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)

        getResponse = await api.get('/api/blogs')
        expect(getResponse.body.length).toBe(3)
        expect(getResponse.body.find(b => b.id === blogToUpdate.id).title).toBe('A new title')
    })

    test('confirm post is updated by likes', async () => {

        let getResponse = await api.get('/api/blogs')
        expect(getResponse.body.length).toBe(3)

        const blogToUpdate = getResponse.body[0]

        blogToUpdate.likes = 20

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)

        getResponse = await api.get('/api/blogs')
        expect(getResponse.body.length).toBe(3)
        expect(getResponse.body.find(b => b.id === blogToUpdate.id).likes).toBe(20)
    })

})



afterAll(() => {
    mongoose.connection.close()
})
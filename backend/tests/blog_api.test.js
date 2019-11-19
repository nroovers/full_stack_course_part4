const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: "Travel blog",
        author: "Aava",
        url: "http://www.travel.com",
        likes: 5
    },
    {
        title: "React blog",
        author: "Nicolai",
        url: "http://www.react.com",
        likes: 3
    },
    {
        title: "Toy blog",
        author: "Lilja",
        url: "http://www.lelut.fi",
        likes: 7
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const blogPromises = blogObjects.map(blog => blog.save())

    await Promise.all(blogPromises)
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

})

afterAll(() => {
    mongoose.connection.close()
})
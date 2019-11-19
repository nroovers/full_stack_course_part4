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

    test('the first blog is about travel', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.map(b => b.title)).toContain('Travel blog')
    })
})

afterAll(() => {
    mongoose.connection.close()
})
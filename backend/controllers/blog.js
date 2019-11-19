const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('', async (request, response) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)

    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })

    if (!blog.likes)
        blog.likes = 0

    const saveBlog = await blog.save()
    response.status(201).json(saveBlog)
})

module.exports = blogsRouter
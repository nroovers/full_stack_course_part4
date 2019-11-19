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

    if (!blog.title)
        return response.status(400).json({ error: 'title missing' })

    if (!blog.url)
        return response.status(400).json({ error: 'url missing' })

    const saveBlog = await blog.save()
    response.status(201).json(saveBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


module.exports = blogsRouter
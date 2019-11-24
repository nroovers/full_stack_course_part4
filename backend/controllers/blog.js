const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('', async (request, response) => {
    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.likes)
        blog.likes = 0

    if (!blog.title)
        return response.status(400).json({ error: 'title missing' })

    if (!blog.url)
        return response.status(400).json({ error: 'url missing' })

    const storedUsers = await User.find({})
    const user = storedUsers[0]

    blog.user = user._id;
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save()

    response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {

    const blog = request.body

    if (!blog.likes)
        blog.likes = 0

    if (!blog.title)
        return response.status(400).json({ error: 'title missing' })

    if (!blog.url)
        return response.status(400).json({ error: 'url missing' })

    const newblog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }

    console.log('newBlog', newblog)
    console.log('request.params.id', request.params.id)

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true })

    console.log('updatedBlog', updatedBlog)

    response.json(updatedBlog.toJSON())
})


module.exports = blogsRouter
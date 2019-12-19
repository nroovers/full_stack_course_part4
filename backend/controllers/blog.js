const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    // .populate('comments', { text: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('', async (request, response, next) => {

    try {
        const blog = new Blog(request.body)

        if (!blog.likes)
            blog.likes = 0

        if (!blog.title)
            return response.status(400).json({ error: 'title missing' })

        if (!blog.url)
            return response.status(400).json({ error: 'url missing' })


        if (!request.token) {
            console.log('error, token missing')
            return response.status(401).json({ error: 'token missing ' })
        }

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken || !decodedToken.id) {
            console.log('error, token invalid')
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)

        // const storedUsers = await User.find({})//////////////////
        // const user = storedUsers[0] /////////////////////////////

        // blog.user = user._id;
        blog.user = user;

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save()

        response.status(201).json(savedBlog)
    }
    catch (error) {
        next(error)
    }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {

    console.log('/:id/comments')

    const comment = request.body.text

    const blog = await Blog.findById(request.params.id)

    if (!blog)
        return response.status(400).json({ error: 'blog not found' })


    // const newBlog = { ...blog }
    const newBlog = copyBlog(blog)

    console.log('blog', blog)
    console.log('request.params.id', request.params.id)

    console.log('newblog', newBlog)
    console.log('request.body', request.body)


    newBlog.comments = !newBlog.comments
        ? [comment]
        : newBlog.comments.concat(comment)

    console.log('newblog', newBlog)

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })

    console.log('updatedBlog', updatedBlog)

    response.json(updatedBlog.toJSON())

})




blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const blogtodelete = await Blog.findById(request.params.id)

        if (!blogtodelete) {
            return response.status(204).end()
        }

        console.log('blogtodelete', blogtodelete, request.token)

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        console.log('decodedToken', decodedToken)
        if (!decodedToken || !decodedToken.id) {
            console.log('error, token invalid')
            return response.status(401).json({ error: 'token invalid' })
        }

        if (blogtodelete.user.toString() === decodedToken.id.toString()) {
            await blogtodelete.delete()
            response.status(204).end()
        }
        else {
            return response.status(401).json({ error: 'unauthorised blog deletion' })
        }
    }
    catch (error) {
        next(error)
    }
})


blogsRouter.put('/:id', async (request, response) => {

    const blog = request.body

    if (!blog.likes)
        blog.likes = 0

    if (!blog.title)
        return response.status(400).json({ error: 'title missing' })

    if (!blog.url)
        return response.status(400).json({ error: 'url missing' })

    const newblog = copyBlog(blog)

    console.log('newBlog', newblog)
    console.log('request.params.id', request.params.id)

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true })

    console.log('updatedBlog', updatedBlog)

    response.json(updatedBlog.toJSON())
})

const copyBlog = blog => {
    const newblog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        comments: blog.comments
    }
    if (blog.user) { newblog.user = blog.user.id }
    return newblog
}


module.exports = blogsRouter
const User = require('../models/user')
const Blog = require('../models/blog')


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

const initiateBlogs = (async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const blogPromises = blogObjects.map(blog => blog.save())

    await Promise.all(blogPromises)
})


const initialUsers = [
    { username: 'root', password: 'sekret' },
    { username: 'user2', name: 'firstname lastname', password: 'sekret123' }
]

const initiateUsers = (async () => {
    await User.deleteMany({})
    // console.log('users collection cleared')
    const userObjects = initialUsers.map(user => new User(user))
    const userPromises = userObjects.map(user => {
        // console.log(user)
        return user.save()
    })
    await Promise.all(userPromises)
    // console.log('initial users saved')
})

module.exports = {
    initialBlogs,
    initiateBlogs,
    initialUsers,
    initiateUsers
}
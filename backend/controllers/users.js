const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('', async (request, response) => {
    const users = await User.find({})
        .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})


usersRouter.post('', async (request, response, next) => {
    try {
        const body = request.body

        if (!body.username)
            return response.status(400).send({ error: 'username missing' })
        if (!body.password)
            return response.status(400).send({ error: 'password missing' })
        if (body.password.length < 3)
            return response.status(400).send({ error: 'password must be at least 3 characters' })

        console.log('Post body', body)

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }

})

module.exports = usersRouter
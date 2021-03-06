const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const { User } = require('../models')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ where: { username: body.username } })
    console.log("Löytyi käyttäjä: ", user)

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordhash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        admin: user.admin,
        user_id: user.user_id,
    }
    console.log(process.env.SECRET)
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({
            token, username: user.username, name: user.name,
            admin: user.admin
        })
})

module.exports = loginRouter
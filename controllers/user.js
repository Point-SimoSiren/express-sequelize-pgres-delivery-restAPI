const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')

// SELF-REGISTER ENDPOINT
userRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        console.log("--------------------------")
        console.log(body)
        console.log("--------------------------")

        const saltRounds = 8
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const newUser = await User.create({
            username: body.username,
            name: body.name,
            address: body.address,
            phone: body.phone,
            email: body.email,
            admin: body.admin,
            passwordhash: passwordHash
        });

        response.json(newUser.id)
    } catch (exception) {
        console.log(exception)
    }
})

// ADMIN FEATURE: GET ALL USERS
userRouter.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

// ADMIN FEATURE: GET ONE USER BY USER_ID
userRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    try {
        const user = await User.findByPk(id)
        if (user) {

            response.json(user)
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        response.json(exception)
    }
})

// ADMIN FEATURE: DELETE USER
userRouter.delete('/:id', async (req, res) => {
    try {
        await Item.destroy({
            where: {
                user_id: req.params.id
            }
        })
        res.status(204).end()
    }
    catch (ex) {
        response.json(ex)
    }
})

// ADMIN FEATURE: UPDATE USER
userRouter.put('/:id', async (request, response) => {
    const body = await request.body
    const id = await request.params.id

    const updated = await User.update({
        username: body.username,
        name: body.name,
        address: body.address,
        phone: body.phone,
        email: body.email,
        admin: body.admin,
        passwordhash: body.passwordhash
    }, {
        where: { user_id: id },
        returning: true, // needed for affectedRows to be populated
        plain: true // only plain objects
    })

    response.json(updated)
})

module.exports = userRouter

/*

// TOKEN PROCESSOR FUNCION

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}




const token = getTokenFrom(request)

try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
}
catch (exception) {
    console.log(exception)
}

try {
    const users = await User.find({})
    response.json(users.map(u => u.toJSON()))
}
catch (exception) {
    console.log(users)
    console.log(exception)
}


// ADMIN FEATURE: DELETE USER

userRouter.delete('/:id', async (request, response) => {
    const token = getTokenFrom(request)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    } catch (exception) {
        console.log(exception)
    }

    try {
        await User.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        console.log(exception)
    }
})


// ADMIN FEATURE: UPDATE USER (IN FUTURE MIGHT BE ALSO FOR USER TO UPDATE OWN INFO)

userRouter.put('/:id', async (request, response) => {
    const body = await request.body

    const token = getTokenFrom(request)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    } catch (exception) {
        console.log(exception)
    }

    const user = {
        username: body.username,
        name: body.name,
        address: body.address,
        phone: body.phone,
        email: body.email,
        admin: body.admin,
        passwordHash
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, user)

        response.json(updatedUser.toJSON())

    } catch (exception) {
        console.log(exception)
    }
})

*/


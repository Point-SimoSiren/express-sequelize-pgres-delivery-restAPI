const categoryRouter = require('express').Router()
const { Category } = require('../models')

//const jwt = require('jsonwebtoken')

// GET ALL PRODUCT CATEGORIES

categoryRouter.get('/', async (req, res) => {
    const c = await Category.findAll()
    res.json(c)
})

// ADD NEW CATEGORY

categoryRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        const newCategory = new Category({
            name: body.name,
            description: body.description
        })

        const savedCategory = await newCategory.save()
        response.json(savedCategory.toJSON())
    } catch (ex) {
        response.json(ex)
    }
})

// DELETE CATEGORY

categoryRouter.delete('/:id', async (req, res) => {

    try {
        await Category.destroy({
            where: {
                category_id: req.params.id
            }
        })
        res.status(204).end()
    }
    catch (ex) {
        response.json(ex)
    }

})

// ADMIN FEATURE: UPDATE PRODUCT CATEGORY

categoryRouter.put('/:id', async (request, response) => {

    const body = await request.body
    const id = await request.params.id

    const [affectedRows] = await Category.update({
        name: body.name,
        description: body.description
    }, {
        where: { category_id: id },
        returning: true, // needed for affectedRows to be populated
        plain: true // makes sure that the returned instances are just plain objects
    })

    response.json(affectedRows.toJSON)

})

module.exports = categoryRouter

/*

// TOKEN PROCESSOR FUNCTION

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

// ADMIN FEATURE: POST NEW PRODUCT CATEGORY

categoryRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    } catch (exception) {
        next(exception)
    }

    try {
        const newCategory = new Category({
            name: body.name,
            description: body.description,
            items: []
        })

        const savedCategory = await newCategory.save()
        response.json(savedCategory.toJSON())
    } catch (exception) {
        next(exception)
    }
})

// ADMIN FEATURE: DELETE PRODUCT CATEGORY


/*
categoryRouter.delete('/:id', async (request, response, next) => {
    const token = getTokenFrom(request)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    } catch (exception) {
        next(exception)
    }

    try {
        const category = Category.findByPk(id)
        category.destroy()
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }

})

// ADMIN FEATURE: UPDATE PRODUCT CATEGORY

categoryRouter.put('/:id', async (request, response, next) => {
    const body = await request.body

    const token = getTokenFrom(request)
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    } catch (exception) {
        next(exception)
    }

    console.log(request.params.id)

    const category = {
        name: body.name,
        description: body.description,
        items: body.items
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(request.params.id, category)

        response.json(updatedCategory.toJSON())

    } catch (exception) {
        next(exception)
    }
})


*/
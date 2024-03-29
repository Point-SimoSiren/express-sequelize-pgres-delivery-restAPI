const itemRouter = require('express').Router()
const { Item } = require('../models')

// GET ALL ITEMS
itemRouter.get('/', async (req, res) => {

    const items = await Item.findAll()
    res.json(items)
})

// ITEMS PER CATEGORY_ID
itemRouter.get('/ct/:ctid', async (req, res) => {
    try {
        const itemsByCategory = await Item.findAll({
            where: {
                category_id: req.params.ctid
            }
        })

        return res.json(itemsByCategory)
    }
    catch (exception) {
        response.json(exception)
    }
})

// GET ONE ITEM BY ITEM_ID
itemRouter.get('/:id', async (request, response) => {
    try {
        const item = await Item.findByPk(request.params.id)
        if (item) {
            response.json(item)
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        response.json(exception)
    }
})

// ADMIN FEATURE: ADD NEW PRODUCT ITEM
itemRouter.post('/', async (request, response) => {
    const body = request.body

    try {
        const newItem = new Item({
            name: body.name,
            package: body.package,
            price: body.price,
            active: body.active,
            manufacturer: body.manufacturer,
            description: body.description,
            category_id: body.category_id,
            imagelink: body.imagelink
        })

        const savedItem = await newItem.save()
        response.json(savedItem.toJSON())
    } catch (exception) {
        response.json(exception)
    }
})

// UPDATE ITEM
itemRouter.put('/:id', async (request, response) => {
    const body = await request.body
    const id = await request.params.id

    const updated = await Item.update({
        name: body.name,
        package: body.package,
        price: body.price,
        manufacturer: body.manufacturer,
        description: body.description,
        active: body.active,
        imagelink: body.imagelink,
        category_id: body.category_id
    }, {
        where: { item_id: id },
        returning: true, // needed for affectedRows to be populated
        plain: true // only plain objects
    })

    response.json(updated)
})

// DELETE ITEM
itemRouter.delete('/:id', async (req, res) => {
    try {
        await Item.destroy({
            where: {
                item_id: req.params.id
            }
        })
        res.status(204).end()
    }
    catch (ex) {
        response.json(ex)
    }
})

module.exports = itemRouter

/*

// TOKEN PROCESSOR FUNCTION

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

// ADMIN FEATURE: ADD NEW PRODUCT ITEM

itemsRouter.post('/', async (request, response, next) => {
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
        const newItem = new Item({
            name: body.name,
            package: body.package,
            price: body.price,
            active: body.active,
            manufacturer: body.manufacturer,
            description: body.description,
            category: body.categoryId
        })

        const savedItem = await newItem.save()
        response.json(savedItem.toJSON())
    } catch (exception) {
        next(exception)
    }
})
    */
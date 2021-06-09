const itemRouter = require('express').Router()
const { Item } = require('../models')

// GET ALL ITEMS
itemRouter.get('/', async (req, res) => {

    const items = await Item.findAll()
    res.json(items)
})

// ITEMS PER CATEGORY_ID
itemRouter.get('/ct/:ctid', async (req, res) => {

    const itemsByCategory = await Item.findAll({
        where: {
            category_id: req.params.ctid
        }
    })

    return res.json(itemsByCategory)
})


// GET ONE ITEM BY ITEM_ID
itemRouter.get('/:id', async (request, response) => {
    try {
        const item = await Item.findById(request.params.id)
        if (item) {
            response.json(item.toJSON())
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        res.json(exception)
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
            category: body.categoryId

        })

        const savedItem = await newItem.save()
        response.json(savedItem.toJSON())
    } catch (exception) {
        responce.json(exception)
    }
})

itemRouter.put('/:id', async (request, response) => {

    const body = request.body
    const id = request.params.id

    const [affectedRows] = await Item.update({
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

    response.json(affectedRows.toJSON)

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
const orderRowRouter = require('express').Router()
const { Orderrow } = require('../models')
const db = require('../models/index')

//const jwt = require('jsonwebtoken')

// ADMIN FEATURE: GET ALL ORDER-ROWS FROM ALL ORDERS
orderRowRouter.get('/', async (req, res) => {
    const orderRows = await Orderrow.findAll()
    res.json(orderRows)
})

// RAW SQL TO QUERY: ROWS BY ORDER_ID WITH JOINED ITEM TABLE TO GET PRODUCTNAME
orderRowRouter.get('/order/:orderid', async (req, res) => {

    try {
        const orderid = req.params.orderid

        // Check the given parameter to avoid SQL injection
        if (orderid.length < 33 || orderid.length > 39 ||
            orderid.includes(";") || orderid.toUpperCase().includes("DROP") ||
            orderid.toUpperCase().includes("DATA") ||
            orderid.toUpperCase().includes("TABLE")) {

            return res.status(400).end("Malformatted order_id")
        }
        const [results, metadata] = await db.sequelize.query
            ("SELECT * FROM orderrow LEFT JOIN item ON item.item_id = orderrow.item_id WHERE  order_id = " + "'" + orderid + "'")

        return res.json(results)
    }
    catch (exception) {
        console.log(exception)
        res.json(exception)
    }
})


// ADD NEW ROW TO ORDER
orderRowRouter.post('/', async (req, res) => {
    try {
        const body = req.body

        const newItem = new Orderrow({
            item_id: body.item_id,
            order_id: body.order_id,
            amount: body.amount
        })

        const savedItem = await newItem.save()
        res.json(savedItem.toJSON())
    } catch (exception) {
        res.json(exception)
    }
})

// DELETE ORDER-ROW
orderRowRouter.delete('/:id', async (req, res) => {
    try {
        await Orderrow.destroy({
            where: {
                orderrow_id: req.params.id
            }
        })
        res.status(204).end()
    }
    catch (ex) {
        response.json(ex)
    }
})

module.exports = orderRowRouter
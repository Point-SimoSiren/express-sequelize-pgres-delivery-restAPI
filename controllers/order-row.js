const orderRowRouter = require('express').Router()
const { Orderrow } = require('../models')

//const jwt = require('jsonwebtoken')

// ADMIN FEATURE: GET ALL ORDER-ROWS FROM ALL ORDERS
orderRowRouter.get('/', async (req, res) => {
    const orderRows = await Orderrow.findAll()
    res.json(orderRows)
})

/* TO DO NEXT RAW:
GET ORDER-ROWS BY ORDER_ID PLUS SHOW ITEM´S PRODUCTNAME
SELECT * FROM orderrow LEFT JOIN item
ON item.item_id = orderrow.item_id WHERE order_id = '9fb9d681-7555-4e6c-a92b-921aa008fc19'
*/


/*
// GET ORDER-ROWS BY ORDER_ID
orderRowRouter.get('/order/:orderid', async (req, res) => {
    try {
        const rowsByOrder = await Orderrow.findAll({
            where: {
                order_id: req.params.orderid
            }
        })
        return res.json(rowsByOrder)
    }
    catch (exception) {
        res.json(exception)
    }
})
*/

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
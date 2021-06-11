const orderRouter = require('express').Router()
const { Order } = require('../models')

//const jwt = require('jsonwebtoken')

// ADMIN FEATURE: GET ALL ORDERS
orderRouter.get('/', async (req, res) => {
    const orders = await Order.findAll()
    res.json(orders)
})

// GET ONE ORDER BY ORDER_ID
orderRouter.get('/:id', async (request, response) => {
    try {
        const order = await Order.findByPk(request.params.id)
        if (order) {
            response.json(order)
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        response.json(exception)
    }
})

// GET ORDERS BY USER_ID
orderRouter.get('/user/:userid', async (req, res) => {
    try {
        const ordersByUser = await Order.findAll({
            where: {
                user_id: req.params.userid
            }
        })

        return res.json(ordersByUser)
    }
    catch (exception) {
        response.json(exception)
    }
})

// PLACE NEW ORDER
orderRouter.post('/', async (req, res) => {
    try {
        const body = req.body

        const newItem = new Order({
            user_id: body.user_id,
            deliveryDate: body.deliveryDate,
            delivered: body.delivered,
            paid: body.paid,
            notes: body.notes,
            totalPrice: body.totalPrice
        })

        const savedItem = await newItem.save()
        res.json(savedItem.toJSON())
    } catch (exception) {
        res.json(exception)
    }
})

// UPDATE ORDER
// eq. when adding or removing rows (changes the total price),
// or marking as delivered or paid
orderRouter.put('/:id', async (request, response) => {
    const body = await request.body
    const id = await request.params.id

    const updated = await Order.update({
        user_id: body.user_id,
        deliveryDate: body.deliveryDate,
        delivered: body.delivered,
        paid: body.paid,
        notes: body.notes,
        totalPrice: body.totalPrice
    }, {
        where: { order_id: id },
        returning: true, // needed for affectedRows to be populated
        plain: true // only plain objects
    })

    response.json(updated)
})

// DELETE ORDER
orderRouter.delete('/:id', async (req, res) => {
    try {
        await Order.destroy({
            where: {
                order_id: req.params.id
            }
        })
        res.status(204).end()
    }
    catch (ex) {
        response.json(ex)
    }
})


module.exports = orderRouter
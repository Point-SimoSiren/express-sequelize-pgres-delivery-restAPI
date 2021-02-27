const express = require('express')
const app = express()

const { User, Category, Item, Order, OrderRow } = require('./models')

app.use(express.json())

app.get('/category', async (req, res, next) => {
    try {
        const c = await Category.findAll()
        console.log(c)
        res.json(c)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

app.listen(5000, () => console.log('server listening on port 5000'))
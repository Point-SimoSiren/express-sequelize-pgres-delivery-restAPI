const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')

const categoryRouter = require('./controllers/category')
const userRouter = require('./controllers/user')
const itemRouter = require('./controllers/item')
const orderRouter = require('./controllers/order')
const orderRowRouter = require('./controllers/order-row')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use(cors())
app.use(helmet())
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/items', itemRouter)
app.use('/api/orders', orderRouter)
app.use('/api/order-rows', orderRowRouter)
app.use('/api/login', loginRouter)

module.exports = app


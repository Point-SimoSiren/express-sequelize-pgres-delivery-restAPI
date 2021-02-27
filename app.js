const express = require('express')
const app = express()
const helmet = require('helmet')
const cors = require('cors')

const categoryRouter = require('./controllers/category')
//const userRouter = require('./controllers/user')
//const itemRouter = require('./controllers/item')
//const orderRouter = require('./controllers/order')
//const orderRowRouter = require('./controllers/order-row')
//const loginRouter = require('./controllers/login')

app.use(express.json())

app.use(cors())
app.use(helmet())
app.use('/api/category', categoryRouter)
//app.use('/api/user', userRouter)
//app.use('/api/item', itemRouter)
//app.use('/api/order', orderRouter)
//app.use('/api/order-row', orderRowRouter)
//app.use('/api/login', loginRouter)

module.exports = app


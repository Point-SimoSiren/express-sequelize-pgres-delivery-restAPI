const express = require('express')
const app = express()

const { Channel, Video, User } = require('./models')

app.use(express.json())

app.get('/channel', async (req, res, next) => {
    try {
        const c = await Channel.findAll()
        console.log(c)
        res.json(c)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

app.get('/video', async (req, res, next) => {
    try {
        const v = await Video.findAll()
        console.log(v)
        res.json(v)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

app.get('/user', async (req, res, next) => {
    try {
        const u = await User.findAll()
        console.log(u)
        res.json(u)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

app.listen(5000, () => console.log('server listening on port 5000'))
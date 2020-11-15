const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

const io = require('socket.io')(http)

const itemRoutes = require('./items/router')
const categoryRoutes = require('./categories/router')
const shopRoutes = require('./shops/router')
const cartRoutes = require('./cart/router')
const userRoutes = require('./users/router')
const userAddressRoutes = require('./userAddress/router')
const orderRoutes = require('./orders/router')
const deliveryGuyRoutes = require('./deliveryGuy/router')

const { ioSocket } = require('./util/socket')

app.use(cors())
app.use(express.json())

app.use('/items', itemRoutes)
app.use('/categories', categoryRoutes)
app.use('/shops', shopRoutes)
app.use('/cart', cartRoutes)
app.use('/user', userRoutes)
app.use('/useraddress', userAddressRoutes)
app.use('/order', orderRoutes)
app.use('/deliveryguy', deliveryGuyRoutes)

io.on('connection', ioSocket)

http.listen(port, () => console.log(`listening on port ${port}`))

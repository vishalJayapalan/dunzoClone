const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const path = require('path')

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

// process.env.PORT
// app.use(express.static(path.join(__dirname, 'myapp/build')))
// app.get('*', (req, res, next) => {
// res.sendFile(path.join(__dirname, '../myapp/build/index.html'))
// next()
// })
// console.log(__dirname)
// console.log('path', path.join(__dirname, 'myapp', 'build'))
if (process.env.NODE_ENV === 'production') {
  // serve static content
  app.use(express.static(path.join(__dirname, '..', 'myapp', 'build')))
  app.get('*', (req, res) => {
    const index = path.join(__dirname, '..', 'myapp', 'build', 'index.html')
    res.sendFile(index)
  })
}

// middleware
app.use(cors())
app.use(express.json())

app.use('/item', itemRoutes)
app.use('/category', categoryRoutes)
app.use('/shop', shopRoutes)
app.use('/cart', cartRoutes)
app.use('/user', userRoutes)
app.use('/useraddress', userAddressRoutes)
app.use('/order', orderRoutes)
app.use('/deliveryguy', deliveryGuyRoutes)

io.on('connection', ioSocket)

http.listen(PORT, () => console.log(`listening on port ${PORT}`))

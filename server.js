const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

const io = require('socket.io')(http)

const itemRoutes = require('./items/itemRoute')
const categoryRoutes = require('./categories/categoryRoute')
const shopRoutes = require('./shops/shopRoute')
const cartRoutes = require('./cart/cartRoute')
const userRoutes = require('./users/userRouter')
const userAddressRoutes = require('./userAddress/userAddressRouter')
const orderRoutes = require('./orders/orderRouter')
const deliveryGuyRoutes = require('./deliveryGuy/deliveryGuyRouter')

app.use(cors())
app.use(express.json())

app.use('/items', itemRoutes)
app.use('/categories', categoryRoutes)
app.use('/shops', shopRoutes)
app.use('/cart', cartRoutes)
app.use('/user', userRoutes)
app.use('/userAddress', userAddressRoutes)
app.use('/order', orderRoutes)
app.use('/deliveryguy', deliveryGuyRoutes)

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('liveLocation', liveLocation => {
    const { lat, lng } = liveLocation
    // console.log(lat, lng)
    socket.broadcast.emit('deliveryLiveLocation', { lat, lng })
  })
  socket.on('deliveryPartnerRequired', ({ shopname, orderid }) => {
    // console.log(shopname)
    socket.broadcast.emit('toDeliveryPartner', { shopname, orderid })
  })
  socket.on('deliveryPartnerAssigned', name => {
    // console.log(name)
    socket.broadcast.emit('partnerAssigned', name)
  })
  socket.on('orderPicked', () => {
    socket.broadcast.emit('orderPickedUp', 'yahooooo')
  })
  socket.on('orderCompleted', () => {
    socket.broadcast.emit('orderDelivered', 'woohoooo')
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(port, () => console.log(`listening on port ${port}`))

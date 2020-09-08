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

app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(express.json())

app.use('/items', itemRoutes)
app.use('/categories', categoryRoutes)
app.use('/shops', shopRoutes)
app.use('/cart', cartRoutes)
app.use('/user', userRoutes)

io.on('connection', socket => {
  console.log('a user connected')
  socket.on('liveLocation', liveLocation => {
    const { latitude, longitude } = liveLocation
    console.log(latitude, longitude)
    socket.broadcast.emit('deliveryLiveLocation', { latitude, longitude })
  })
  socket.on('deliveryPartnerRequired', shopname => {
    console.log(shopname)
    socket.broadcast.emit('toDeliveryPartner', shopname)
  })
  socket.on('deliveryPartnerAssigned', name => {
    console.log(name)
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

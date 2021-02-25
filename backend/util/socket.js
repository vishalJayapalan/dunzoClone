const ioSocket = socket => {
  const { id } = socket.handshake.query
  // socket.join(id)
  // console.log('SOCKETID', socket.handshake.query.id)
  // console.log('SOCKETIDINBUILD', socket.id)
  // console.log('a user connected')
  socket.on('liveLocation', liveLocation => {
    const { lat, lng } = liveLocation
    socket.broadcast.emit('deliveryLiveLocation', { lat, lng })
  })
  socket.on(
    'deliveryPartnerRequired',
    ({ shopname, orderid, shopLocation, userLocation }) => {
      console.log('Inhere')
      socket.broadcast.emit('toDeliveryPartner', {
        shopname,
        orderid,
        shopLocation,
        userLocation
      })
    }
  )
  // socket.on('test', ({ test }) => {
  //   console.log(test)
  // })
  socket.on('deliveryPartnerAssigned', name => {
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
}

module.exports = { ioSocket }

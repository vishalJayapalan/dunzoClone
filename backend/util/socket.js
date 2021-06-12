const users = {}
const deliveryGuys = {}

const ioSocket = socket => {
  const { id } = socket.handshake.query
  // socket.join(id)
  // console.log('SOCKETID', socket.handshake.query.id)
  // console.log('SOCKETIDINBUILD', socket.id)

  // socket.on('active user', id => {})
  socket.on('active delivery partner', ({ deliveryGuyId }) => {
    // console.log('SOCKETIDINBUILDInDelivery', socket.id)
    // console.log('SOCKETIDInDelivery', socket.handshake.query.id)
    console.log('DELIVERYGUYID', deliveryGuyId)
    if (deliveryGuyId) {
      deliveryGuys[deliveryGuyId] = socket
      console.log('DELIVERYGUYS', deliveryGuys[deliveryGuyId].id)
    }
  })

  socket.on('active user', ({ userId }) => {
    // console.log('SOCKETIDINBUILDInUser', socket.id)
    // console.log('SOCKETIDIn', sockeUsert.handshake.query.id)
    console.log('USERIDActiveUser', userId)
    if (userId) {
      users[userId] = socket
      console.log('USERS', users[userId].id)
    } else {
      console.log('SOMEERRORHAPPENING')
    }
  })

  socket.on(
    'deliveryPartnerRequired',
    ({ shopAddress, orderid, shopLocation, userLocation, userId }) => {
      // socket.broadcast.emit('toDeliveryPartner', {
      // console.log('DELIVERYGUYS', deliveryGuys)
      if (users[userId]) {
        console.log('USERSINDELIVERYREQUIRED', users[userId].id)
      } else {
        console.log('USERSINDELIVERYREQUIRED', ' no user details')
      }
      deliveryGuys[1].emit('toDeliveryPartner', {
        shopAddress,
        orderid,
        shopLocation,
        userLocation
      })
    }
  )

  socket.on(
    'deliveryPartnerAssigned',
    ({ deliveryGuyName, userId, deliveryGuyId }) => {
      console.log('USERSSSS', users)
      users[userId].emit(
        'partnerAssigned',
        deliveryGuyName,
        userId,
        deliveryGuyId
      )
    }
  )

  socket.removeAllListeners('liveLocation')
  socket.on('liveLocation', ({ lat, lng, userId }) => {
    console.log(users)
    // const { lat, lng } = liveLocation
    if (users[userId]) users[userId].emit('deliveryLiveLocation', { lat, lng })
  })

  socket.on('orderPicked', ({ userId }) => {
    users[userId].emit('orderPickedUp', 'yahooooo')
  })
  socket.on('orderCompleted', ({ userId }) => {
    users[userId].emit('orderDelivered', 'woohoooo')
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}

module.exports = { ioSocket }

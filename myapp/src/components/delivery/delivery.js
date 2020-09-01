import React, { useEffect, useState } from 'react'
import './delivery.css'
import io from 'socket.io-client'
let socket
export default function Delivery () {
  const endpoint = 'http://localhost:5000'
  const [requirement, setRequirement] = useState(null)
  const [orderPickStatus, setOrderPickStatus] = useState(false)
  const [orderStatus, setOrderStatus] = useState(false)
  useEffect(() => {
    socket = io(endpoint)
    // for getting geolocation
    function success (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      console.log(latitude, longitude)
      socket.emit('liveLocation', { latitude, longitude })
    }
    function error () {
      // status.textContent = 'Unable to retrieve your location'
    }

    if (!navigator.geolocation) {
      // status.textContent = 'Geolocation is not supported by your browser'
    } else {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(success, error)
      }, 5000)
      // status.textContent = 'Locating…'
      // navigator.geolocation.getCurrentPosition(success, error)
    }
  }, [])
  useEffect(() => {
    socket.on('toDeliveryPartner', shopname => {
      console.log(shopname)
      setRequirement(shopname)
    })
  })
  function orderStatusUpdation (status) {
    if (status) {
      socket.emit('deliveryPartnerAssigned', 'speedo')
      setOrderStatus(true)
    }
  }
  function orderPickedUp () {
    setOrderPickStatus(true)
    socket.emit('orderPicked')
  }
  function orderCompleted () {
    socket.emit('orderCompleted')
  }
  return (
    <div className='order-page'>
      <h1>Delivery page</h1>
      {requirement && (
        <div className='order-rows-container'>
          <div className='order-row'>
            <p>Order from {requirement}</p>
            <button
              onClick={() => orderStatusUpdation(true)}
              disabled={orderStatus}
            >
              accept
            </button>
          </div>
          {orderStatus && (
            <div className='order-row'>
              <p>Order Picked</p>
              <button onClick={orderPickedUp}>Picked</button>
            </div>
          )}
          {orderPickStatus && (
            <div className='order-row'>
              <p>Order Status</p>
              <button onClick={orderCompleted}>Completed</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

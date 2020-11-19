import React, { useEffect, useState, useRef } from 'react'
import './delivery.css'
import io from 'socket.io-client'

import Leaflet, { routing } from 'leaflet'
import 'leaflet-routing-machine'

import { getCookie } from '../util/cookies'

let socket
// const endpoint = 'http://192.168.1.13:5000'
const endpoint = '/'

socket = io(endpoint)
export default function Delivery () {
  const [requirement, setRequirement] = useState(null)
  const [orderPickStatus, setOrderPickStatus] = useState(false)
  const [orderStatus, setOrderStatus] = useState(false)
  // const position = [11.858762, 75.404577]
  // let position2 = [11.877094, 75.372391]
  const [pickupLocation, setPickupLocation] = useState([])
  const [deliveryLocation, setDeliveryLocation] = useState([])
  const [orderid, setOrderid] = useState(null)

  const mapRef = useRef(null)
  const routingControlRef = useRef(null)

  const ifOrderNotCompleted = async () => {
    const data = await window.fetch('/order/ongoing', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'deliveryguy-token': getCookie('delivery-token')
      }
    })
    const jsonData = await data.json()
    console.log(jsonData)
    setRequirement(jsonData.shopaddress)
    setPickupLocation(jsonData.deliveryaddress)
    setDeliveryLocation(jsonData.shopaddress)
    setOrderid(jsonData.orderid)
  }

  useEffect(() => {
    ifOrderNotCompleted()
  }, [])

  useEffect(() => {
    socket.on(
      'toDeliveryPartner',
      ({ shopname, orderid, shopLocation, userLocation }) => {
        setRequirement(shopname)
        setPickupLocation(shopLocation)
        setDeliveryLocation(userLocation)
        setOrderid(orderid)
      }
    )
  })

  const updateOrder = async (name, value) => {
    console.log('orderid', orderid)
    const data = await window.fetch(`/order/${orderid}`, {
      method: 'PUT',
      body: JSON.stringify({ name, value }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      // setOrder(jsonData[0])
      console.log('order', jsonData[0])
      // setNewOrderId(order[0].orderid)
    }
  }

  function orderStatusUpdation () {
    // if (status) {
    socket.emit('deliveryPartnerAssigned', 'speedo')
    setOrderStatus(true)
    updateOrder('deliverypartnerid', 1)

    // }
  }
  function orderPickedUp () {
    setOrderPickStatus(true)
    socket.emit('orderPicked')
    updateOrder('orderpickedup', true)
  }
  function orderCompleted () {
    socket.emit('orderCompleted')
    updateOrder('delivered', true)
  }

  useEffect(() => {
    const map = () => {
      mapRef.current = Leaflet.map('mapid').setView(deliveryLocation, 10)

      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current)

      const bikeIcon = Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: '/images/bikeImg.jpg',
        shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png'
      })
      let marker = Leaflet.marker(pickupLocation, {
        icon: bikeIcon
      }).addTo(mapRef.current)

      routingControlRef.current = Leaflet.Routing.control({
        waypoints: [
          Leaflet.latLng(pickupLocation),
          Leaflet.latLng(deliveryLocation)
        ],
        routeWhileDragging: true
      }).addTo(mapRef.current)

      routingControlRef.current.on('routeselected', function (e) {
        const route = e.route
        const cord = []
        for (const coordinates of route.coordinates) {
          cord.push(coordinates)
        }
        const interval = setInterval(() => {
          if (marker !== null) mapRef.current.removeLayer(marker)
          socket.emit('liveLocation', { lat: cord[0].lat, lng: cord[0].lng })

          marker = Leaflet.marker([cord[0].lat, cord[0].lng], {
            icon: bikeIcon
          }).addTo(mapRef.current)
          cord.shift()
          if (!cord.length) {
            clearInterval(interval)
          }
        }, 1000)
      })
    }
    if (orderStatus) map()
  }, [orderStatus])

  return (
    <div className='order-page'>
      <h1>Delivery page</h1>
      <div id='mapid' />
      {requirement && (
        <div className='order-rows-container'>
          <div className='order-row'>
            <p>Order from {requirement}</p>
            <button
              onClick={() => orderStatusUpdation()}
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

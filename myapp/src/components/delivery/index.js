import React, { useEffect, useState, useRef } from 'react'
import './delivery.css'
import io from 'socket.io-client'

import Nominatim from 'nominatim-geocoder'

import Leaflet, { routing } from 'leaflet'
import 'leaflet-routing-machine'
import { Redirect } from 'react-router-dom'

let socket
const endpoint = ''

socket = io(endpoint, { query: { id: 2 } })
export default function Delivery () {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [requirement, setRequirement] = useState(null)
  const [orderPickStatus, setOrderPickStatus] = useState(false)
  const [orderStatus, setOrderStatus] = useState(false)
  const [isOrderCompleted, setIsOrderCompleted] = useState(false)

  const [pickupLocation, setPickupLocation] = useState([])
  const [deliveryLocation, setDeliveryLocation] = useState([])
  const [orderid, setOrderid] = useState(null)
  const [mapShown, setMapShown] = useState(false)
  const [deliveryGuyId, setDeliveryGuyId] = useState(false)
  const [userId, setUserId] = useState('')

  const mapRef = useRef(null)
  const routingControlRef = useRef(null)

  const geocoding = async address => {
    const geocoder = new Nominatim()
    const addressArr = address.split(',')

    address = addressArr.slice(0, 6)
    address = address.join(',')
    const latlong = await geocoder.search({ q: address })
    return [latlong[0].lat, latlong[0].lon]
  }

  const ifOrderNotCompleted = async () => {
    const data = await window.fetch('/order/ongoing/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    if (data.ok) {
      const [order, id] = await data.json()
      if (order.length) {
        const userDeliveryLocation = await geocoding(order[0].delivery_address)
        const userPickupLocation = await geocoding(order[0].shop_address)
        setPickupLocation(userPickupLocation)
        setOrderPickStatus(order[0].status === 'pickedup')
        setDeliveryLocation(userDeliveryLocation)
        setOrderid(order[0].id)
        setRequirement(order[0].shop_address)
        setOrderStatus(true)
        setDeliveryGuyId(id)
      } else {
        console.log('ID', id)
        setDeliveryGuyId(id)
      }
    } else {
      if (data.status === 401) {
        console.log(data.status)
        setIsLoggedIn(false)
      }
    }
  }

  useEffect(() => {
    ifOrderNotCompleted()
  }, [])

  useEffect(() => {
    console.log('DELIVERYGUYID', deliveryGuyId)
    socket.emit('active delivery partner', { deliveryGuyId: deliveryGuyId })
  }, [deliveryGuyId])

  useEffect(() => {
    socket.on(
      'toDeliveryPartner',
      ({ shopAddress, orderid, shopLocation, userLocation, userId }) => {
        setRequirement(shopAddress)
        setPickupLocation(shopLocation)
        setDeliveryLocation(userLocation)
        setOrderid(orderid)
        setUserId(userId)
      }
    )
  }, [])

  const updateOrder = async (name, value) => {
    const data = await window.fetch(`/order/${orderid}/`, {
      method: 'PUT',
      body: JSON.stringify({ name, value }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
    }
  }

  function orderStatusUpdation () {
    socket.emit('deliveryPartnerAssigned', {
      deliveryGuyName: 'speedo',
      deliveryGuyId,
      userId
    })
    setOrderStatus(true)
    updateOrder('delivery_guy_id', 1)
  }
  function orderPickedUp () {
    setOrderPickStatus(true)
    socket.emit('orderPicked', { userId, deliveryGuyId })
    updateOrder('status', 'pickedup')
  }
  function orderCompleted () {
    setIsOrderCompleted(true)
    socket.emit('orderCompleted', { userId, deliveryGuyId })
    updateOrder('status', 'delivered')
  }

  function resetOrder () {
    setRequirement(null)
    setOrderStatus(false)
    setOrderPickStatus(false)
    setIsOrderCompleted(false)
    setPickupLocation([])
    setDeliveryLocation([])
    setOrderid(null)
    setMapShown(false)
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
          socket.emit('liveLocation', {
            lat: cord[0].lat,
            lng: cord[0].lng,
            userId
          })

          marker = Leaflet.marker([cord[0].lat, cord[0].lng], {
            icon: bikeIcon
          }).addTo(mapRef.current)
          cord.shift()
          if (!cord.length) {
            clearInterval(interval)
          }
        }, 1000)
      })
      setMapShown(true)
    }
    if (orderStatus) map()
  }, [orderStatus])

  if (!isLoggedIn) {
    return <Redirect to='/delivery' />
  }

  return isOrderCompleted ? (
    <div>
      <h1>Order Completed</h1>
      <button onClick={resetOrder}>Look For New Orders</button>
    </div>
  ) : (
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
              Accept
            </button>
          </div>
          {orderStatus && mapShown && (
            <div className='order-row'>
              <p>Order Picked</p>
              <button onClick={orderPickedUp} disabled={orderPickStatus}>
                Picked
              </button>
            </div>
          )}
          {orderPickStatus && (
            <div className='order-row'>
              <p>Order Delivered</p>
              <button onClick={orderCompleted}>Completed</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

import React, { useState, useRef, useEffect } from 'react'
import './Map.css'
import { Link } from 'react-router-dom'

import Leaflet from 'leaflet'
import 'leaflet-routing-machine'

import Nominatim from 'nominatim-geocoder'

import Navbar from '../navbar/Navbar'

// import { getCookie } from '../util/cookies'

import io from 'socket.io-client'
const endpoint = ''
const socket = io(endpoint, { query: { id: 1 } })

export default function Map (props) {
  let deliveryLocation = ''
  let pickupLocation = ''
  let shopAddress = ''

  const [packingStatus, setPackingStatus] = useState(false)
  const [noOrder, setNoOrder] = useState(false)

  const [order, setOrder] = useState({})
  let orderIdNotFound = false

  const mapRef = useRef(null)
  const routingControlRef = useRef(null)

  const orderid = props.match.params.orderid
  let orderDelivered = false
  let partnerAlreadyAssigned = false
  const [userId, setUserId] = useState(false)

  // useEffect(() => {
  //   if (userId) {
  //     socket.emit('active user', {
  //       userId
  //     })
  //   }
  // }, [userId])

  const geocoding = async address => {
    const geocoder = new Nominatim()
    const addressArr = address.split(',')
    address = addressArr.slice(0, 6)
    address = address.join(',')
    const latlong = await geocoder.search({ q: address })
    return [latlong[0].lat, latlong[0].lon]
  }

  const map = () => {
    mapRef.current = Leaflet.map('mapid').setView(deliveryLocation, 10)
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current)

    routingControlRef.current = Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(deliveryLocation),
        Leaflet.latLng(pickupLocation)
      ],
      routeWhileDragging: true
    }).addTo(mapRef.current)
  }

  const getOrderDetails = async () => {
    try {
      const data = await window.fetch(`/order/${orderid}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          // 'x-auth-token': getCookie('x-auth-token')
        }
      })
      if (data.ok) {
        const jsonData = await data.json()
        if (jsonData.length === 0) {
          setNoOrder(true)
          orderIdNotFound = true
        }
        setOrder(jsonData[0])
        partnerAlreadyAssigned = Number(jsonData[0].delivery_guy_id)
        if (jsonData[0].status === 'delivered') orderDelivered = true

        deliveryLocation = await geocoding(jsonData[0].delivery_address)
        pickupLocation = await geocoding(jsonData[0].shop_address)
        shopAddress = jsonData[0].shop_address
        setUserId(jsonData[0].user_id)
        // orderId  = jsonData[0].id
      } else {
        orderIdNotFound = true
        const jsonData = await data.json()
        throw jsonData
      }
    } catch (e) {
      setNoOrder(true)
    }
  }

  const startupFunction = async () => {
    await getOrderDetails()
    if (orderIdNotFound || orderDelivered) return
    setPackingStatus(true)
    map()
    if (!partnerAlreadyAssigned) {

      socket.emit('deliveryPartnerRequired', {
        shopAddress,
        orderid,
        shopLocation: pickupLocation,
        userLocation: deliveryLocation
      })
    }
    // socket.emit('test', { test: 'TEST' })
    socket.on('partnerAssigned', partnerName => {
      setOrder(prevOrder => {
        return { ...prevOrder, delivery_guy_id: partnerName }
      })
    })

    socket.on('orderPickedUp', () => {
      setOrder(prevOrder => {
        return { ...prevOrder, status: 'pickedup' }
      })
    })

    socket.on('orderDelivered', () => {
      setOrder(prevOrder => {
        return { ...prevOrder, status: 'delivered' }
      })
    })

    if (order.delivery_guy_id != 0) {
      socket.on('deliveryLiveLocation', location => {
        if (bikeMarker !== null) mapRef.current.removeLayer(bikeMarker)
        bikeMarker = Leaflet.marker([location.lat, location.lng], {
          icon: bikeIcon
        }).addTo(mapRef.current)
      })
    }
  }

  useEffect(() => {
    startupFunction()
  }, [])

  const bikeIcon = Leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/images/bikeImg.jpg',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png'
  })
  let bikeMarker = null

  return noOrder ? (
    <div>
      <h1>The Order Number Does not exist</h1>
      <Link to={{ pathname: '/' }}>Return to Home Page</Link>
    </div>
  ) : Object.keys(order).length === 0 ? (
    <h1>Loading ...</h1>
  ) : order.status === 'delivered' ? (
    <div className='order-completed-container'>
      <Navbar hideLoginAndLogout={true} />
      <div className='order-completed-inner-container'>
        <h1 className='order-completed-msg'>Your order has been delivered </h1>
        <Link to={{ pathname: '/' }}>Go To Home Page</Link>
      </div>
    </div>
  ) : (
    <div className='track-order-page'>
      <Navbar hideLoginAndLogout={true} />
      {order.status === 'delivered' ? (
        <h1>Order Completed</h1>
      ) : (
        <div className='track-order-container'>
          <div className='track-title-container'>
            <h3>Track Your Order</h3>
          </div>
          <div className='map-delivery-detail'>
            <div id='mapid' />
            <div className='delivery-process-details-container'>
              <div className='order-details'>
                <p>Order received</p>
              </div>

              <div className='order-details'>
                {packingStatus && <p>Items Packed</p>}
              </div>

              <div className='order-details'>
                {order.delivery_guy_id != 0 && <p>Delivery Partner Assigned</p>}
              </div>

              <div className='order-details'>
                {order.status === 'pickedup' && <p>Order picked up</p>}
              </div>
              <div className='order-details'>
                {order.status === 'delivered' && <p>Delivered</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='item-list-container'></div>
    </div>
  )
}

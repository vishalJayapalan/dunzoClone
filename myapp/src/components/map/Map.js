import React, { useState, useRef, useEffect } from 'react'
import './Map.css'

import Leaflet, { routing } from 'leaflet'
import 'leaflet-routing-machine'

import Nominatim from 'nominatim-geocoder'

import Navbar from '../navbar/Navbar'

import { getCookie } from '../util/cookies'

import io from 'socket.io-client'
let socket
const endpoint = 'http://localhost:5000'
socket = io(endpoint)

export default function Map (props) {
  const [liveLocation, setLiveLocation] = useState({
    latitude: 11.868762,
    longitude: 75.384577
  })
  const [deliveryPartnerName, setDeliveryPartnerName] = useState(null)

  const position = [11.858762, 75.404577]
  const position2 = [11.877094, 75.372391]
  // const [orderCompleted, setOrderCompleted] = useState(false)
  const [packingStatus, setPackingStatus] = useState(false)
  // const [orderPickStatus, setOrderPickStatus] = useState(false)
  const [order, setOrder] = useState({})

  const mapRef = useRef(null)
  const routingControlRef = useRef(null)

  const orderid = props.match.params.orderid

  // let bikeMarker

  const map = () => {
    mapRef.current = Leaflet.map('mapid').setView(position, 10)
    https: Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap contributors'
      }
    ).addTo(mapRef.current)

    const geocoding = async address => {
      const geocoder = new Nominatim()

      const latlong = await geocoder.search({ q: address })
      console.log('latlong', latlong)
    }

    geocoding('Shoppers')

    let location = []
    function success (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      setLiveLocation({ latitude, longitude })
      location = [latitude, longitude]
    }

    routingControlRef.current = Leaflet.Routing.control({
      waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)],
      routeWhileDragging: true
    }).addTo(mapRef.current)
  }

  const getOrderDetails = async () => {
    const data = await window.fetch(`http://localhost:5000/order/${orderid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      setOrder(jsonData[0])
      console.log('order', jsonData[0])
      // setNewOrderId(order[0].orderid)
    }
  }

  useEffect(() => {
    getOrderDetails()
    map()
    setTimeout(() => {
      setPackingStatus(true)
      socket = io(endpoint)
      socket.emit('deliveryPartnerRequired', {
        shopname: 'Shoppers Stop',
        orderid
      })
    }, 5000)
  }, [])
  const bikeIcon = Leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: '/images/bikeImg.jpg',
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png'
  })
  let bikeMarker = null

  useEffect(() => {
    socket.on('partnerAssigned', partnerName => {
      setDeliveryPartnerName(partnerName)
    })
    socket.on('orderPickedUp', () => {
      setOrder(prevOrder => {
        return { ...prevOrder, orderpickedup: true }
      })
      // setOrderPickStatus(true)
    })
    socket.on('orderDelivered', () => {
      setOrder(prevOrder => {
        return { ...prevOrder, delivered: true }
      })
      // setOrderCompleted(true)
    })
    socket.on('deliveryLiveLocation', location => {
      if (bikeMarker !== null) mapRef.current.removeLayer(bikeMarker)
      bikeMarker = Leaflet.marker([location.lat, location.lng], {
        icon: bikeIcon
      }).addTo(mapRef.current)
    })
  })

  return (
    <div className='track-order-page'>
      <Navbar hideLoginAndLogout={true} />
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
              {deliveryPartnerName && <p>Delivery Partner Assigned</p>}
            </div>

            <div className='order-details'>
              {order.orderpickedup && <p>Order picked up</p>}
            </div>
            <div className='order-details'>
              {order.delivered && <p>Delivered</p>}
            </div>
          </div>
        </div>
      </div>
      <div className='item-list-container'></div>
    </div>
  )
}

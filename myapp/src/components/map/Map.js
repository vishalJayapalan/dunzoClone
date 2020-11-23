import React, { useState, useRef, useEffect } from 'react'
import './Map.css'
// import { proxy } from '../../../package.json'

import Leaflet from 'leaflet'
import 'leaflet-routing-machine'

import Nominatim from 'nominatim-geocoder'

import Navbar from '../navbar/Navbar'

import { getCookie } from '../util/cookies'

import io from 'socket.io-client'
// let socket
const endpoint = '/'
const socket = io(endpoint)

export default function Map (props) {
  // console.log('Proxy', proxy)
  let deliveryLocation = ''
  let pickupLocation = ''
  const [packingStatus, setPackingStatus] = useState(false)
  const [order, setOrder] = useState({})

  const mapRef = useRef(null)
  const routingControlRef = useRef(null)

  const orderid = props.match.params.orderid

  const geocoding = async address => {
    const geocoder = new Nominatim()
    const addressArr = address.split(',')

    address = addressArr.slice(0, 9)
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
    const data = await window.fetch(`/order/${orderid}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getCookie('x-auth-token')
      }
    })
    if (data.ok) {
      const jsonData = await data.json()
      setOrder(jsonData[0])

      deliveryLocation = await geocoding(jsonData[0].deliveryaddress)

      pickupLocation = await geocoding(jsonData[0].shopaddress)
    }
  }

  const startupFunction = async () => {
    await getOrderDetails()
    map()
    setTimeout(() => {
      setPackingStatus(true)
      socket.emit('deliveryPartnerRequired', {
        shopname: 'Shoppers Stop',
        orderid,
        shopLocation: pickupLocation,
        userLocation: deliveryLocation
      })
    }, 5000)
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

  useEffect(() => {
    socket.on('partnerAssigned', partnerName => {
      setOrder(prevOrder => {
        return { ...prevOrder, deliverypartnerid: partnerName }
      })
    })
    socket.on('orderPickedUp', () => {
      setOrder(prevOrder => {
        return { ...prevOrder, orderpickedup: true }
      })
    })
    socket.on('orderDelivered', () => {
      setOrder(prevOrder => {
        return { ...prevOrder, delivered: true }
      })
    })

    if (order.deliverypartnerid != 0) {
      socket.on('deliveryLiveLocation', location => {
        if (bikeMarker !== null) mapRef.current.removeLayer(bikeMarker)
        bikeMarker = Leaflet.marker([location.lat, location.lng], {
          icon: bikeIcon
        }).addTo(mapRef.current)
      })
    }
  }, [packingStatus])

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
              {order.deliverypartnerid != 0 && <p>Delivery Partner Assigned</p>}
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

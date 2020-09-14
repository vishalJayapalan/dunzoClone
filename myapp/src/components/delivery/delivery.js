import React, { useEffect, useState, useRef } from 'react'
import './delivery.css'
import io from 'socket.io-client'

import Leaflet, { routing } from 'leaflet'
import 'leaflet-routing-machine'

import Nominatim from 'nominatim-geocoder'

let socket
// const endpoint = 'http://192.168.1.13:5000'
const endpoint = 'http://localhost:5000'

socket = io(endpoint)
export default function Delivery () {
  const [requirement, setRequirement] = useState(null)
  const [orderPickStatus, setOrderPickStatus] = useState(false)
  const [orderStatus, setOrderStatus] = useState(false)
  const position = [11.858762, 75.404577]
  let position2 = [11.877094, 75.372391]

  const mapRef = useRef(null)
  const routingControlRef = useRef(null)

  useEffect(() => {
    // for getting geolocation
    // function success (position) {
    //   const latitude = position.coords.latitude
    //   const longitude = position.coords.longitude
    //   console.log(latitude, longitude)
    //   socket.emit('liveLocation', { latitude, longitude })
    // }
    // function error () {
    //   status.textContent = 'Unable to retrieve your location'
    // }

    if (!navigator.geolocation) {
      // status.textContent = 'Geolocation is not supported by your browser'
    } else {
      // setInterval(() => {
      //   navigator.geolocation.getCurrentPosition(success, error)
      // }, 5000)
    }
  }, [])
  useEffect(() => {
    socket.on('toDeliveryPartner', shopname => {
      console.log(shopname)
      setRequirement(shopname)
    })
  })
  function orderStatusUpdation (status) {
    function success (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      console.log(latitude, longitude)
      socket.emit('liveLocation', { latitude, longitude })
    }
    function error () {
      // status.textContent = 'Unable to retrieve your location'
    }
    if (status) {
      socket.emit('deliveryPartnerAssigned', 'speedo')
      setOrderStatus(true)

      // setInterval(() => {
      //   navigator.geolocation.getCurrentPosition(success, error)
      // }, 5000)
    }
  }
  function orderPickedUp () {
    setOrderPickStatus(true)
    socket.emit('orderPicked')
  }
  function orderCompleted () {
    socket.emit('orderCompleted')
  }

  useEffect(() => {
    const map = () => {
      mapRef.current = Leaflet.map('mapid').setView(position, 10)

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
      let marker = Leaflet.marker(position, {
        icon: bikeIcon
      }).addTo(mapRef.current)

      routingControlRef.current = Leaflet.Routing.control({
        waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)],
        routeWhileDragging: true
        // geocoder: Leaflet.Control.geocoder.nominatim()
      }).addTo(mapRef.current)

      routingControlRef.current.on('routeselected', function (e) {
        const route = e.route
        const cord = []
        for (const coordinates of route.coordinates) {
          // console.log(coordinates)
          cord.push(coordinates)
        }
        const interval = setInterval(() => {
          // const removeRoutingControl = () => {
          //   if (routingControlRef.current != null) {
          //     mapRef.current.removeControl(routingControlRef.current)
          //     routingControlRef.current = null
          //   }
          // }
          if (marker !== null) mapRef.current.removeLayer(marker)
          console.log(cord[0].lat, cord[0].lng)
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

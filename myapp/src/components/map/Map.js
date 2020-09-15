import React, { useState, useRef, useEffect } from 'react'
import './Map.css'

import Leaflet, { routing } from 'leaflet'
import 'leaflet-routing-machine'

import Nominatim from 'nominatim-geocoder'

import Navbar from '../navbar/Navbar'

import io from 'socket.io-client'
let socket
const endpoint = 'http://localhost:5000'
socket = io(endpoint)

export default function Map ({ location }) {
  const [liveLocation, setLiveLocation] = useState({
    latitude: 11.868762,
    longitude: 75.384577
  })
  const [deliveryPartnerName, setDeliveryPartnerName] = useState(null)

  const position = [11.858762, 75.404577]
  const position2 = [11.877094, 75.372391]
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [packingStatus, setPackingStatus] = useState(false)
  const [orderPickStatus, setOrderPickStatus] = useState(false)

  const mapRef = useRef(null)
  const routingControlRef = useRef(null)

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
    }

    geocoding('Shoppers Stop,kannur,kerala')

    let location = []
    function success (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      setLiveLocation({ latitude, longitude })
      location = [latitude, longitude]
    }

    // const removeRoutingControl = () => {
    //   if (routingControlRef.current != null) {
    //     mapRef.current.removeControl(routingControlRef.current)
    //     routingControlRef.current = null
    //   }
    // }

    // async function onMapClick (e) {
    // navigator.geolocation.getCurrentPosition(success)
    // if (routingControlRef.current != null) removeRoutingControl()

    routingControlRef.current = Leaflet.Routing.control({
      waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)],
      routeWhileDragging: true
    }).addTo(mapRef.current)

    // routingControlRef.current.on('routeselected', function (e) {
    //   const route = e.route
    //   for (const coordinates of route.coordinates) {
    //     console.log(coordinates)
    //   }
    // })
    // }

    // mapRef.current.on('click', onMapClick)
  }

  useEffect(() => {
    map()
    setTimeout(() => {
      setPackingStatus(true)
      socket = io(endpoint)
      socket.emit('deliveryPartnerRequired', 'Shoppers Stop')
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
  // let bikeMarker = Leaflet.marker(position, {
  //   icon: bikeIcon
  // }).addTo(mapRef.current)

  useEffect(() => {
    socket.on('partnerAssigned', partnerName => {
      setDeliveryPartnerName(partnerName)
    })
    socket.on('orderPickedUp', () => {
      setOrderPickStatus(true)
    })
    socket.on('orderDelivered', () => {
      setOrderCompleted(true)
    })
    socket.on('deliveryLiveLocation', location => {
      // setLiveLocation(location)
      // console.log(location)
      if (bikeMarker !== null) mapRef.current.removeLayer(bikeMarker)
      bikeMarker = Leaflet.marker([location.lat, location.lng], {
        icon: bikeIcon
      }).addTo(mapRef.current)

      // Leaflet.marker([liveLocation.latitude, liveLocation.longitude], {
      //   icon: bikeIcon
      // }).addTo(mapRef.current)
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
              <input type='checkbox' checked={true} readOnly={true} />{' '}
              <p>Order received</p>
            </div>

            <div className='order-details'>
              <input type='checkbox' checked={packingStatus} readOnly={true} />{' '}
              {!packingStatus ? (
                <p>Items are being packed</p>
              ) : (
                <p>Items Packed</p>
              )}
            </div>

            <div className='order-details'>
              <input
                type='checkbox'
                checked={deliveryPartnerName}
                readOnly={true}
              />{' '}
              {deliveryPartnerName ? (
                <p>Delivery Partner Assigned</p>
              ) : (
                <p>Looking for a partner</p>
              )}
            </div>

            <div className='order-details'>
              <input
                type='checkbox'
                checked={orderPickStatus}
                readOnly={true}
              />{' '}
              <p>Order picked up</p>
            </div>

            <div className='order-details'>
              <input type='checkbox' checked={orderCompleted} readOnly={true} />{' '}
              <p>Delivered</p>
            </div>
          </div>
        </div>
      </div>
      <div className='item-list-container'></div>
    </div>
  )
}

// const icon = L.icon({
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
//   iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png'
// })

// https://nominatim.openstreetmap.org/search/kannur?format=json&addressdetails=1&limit=1&polygon_svg=1

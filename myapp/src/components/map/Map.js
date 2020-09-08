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

  // Making a map and tiles
  // let mymap
  const mapRef = useRef(null)
  const routingControlRef = useRef(null)
  const map = () => {
    // mymap = Leaflet.map('mapid').setView(position, 13)
    mapRef.current = Leaflet.map('mapid').setView(position, 10)

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current)

    // making two markers and showing popup
    let marker = Leaflet.marker(position).addTo(mapRef.current)
    // const storeMarket = Leaflet.marker(position2).addTo(mymap)
    // const test = Leaflet.marker(position3).addTo(mapRef.current)
    // const bikeIcon = Leaflet.icon({
    //   iconSize: [25, 41],
    //   iconAnchor: [10, 41],
    //   popupAnchor: [2, -40],
    //   iconUrl: '/images/bikeImg.jpg',
    //   shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png'
    // })
    // Leaflet.marker([11.877194, 75.375391], { icon: bikeIcon }).addTo(mymap)

    // mapRef.current.on('click', onMapClick) // will show a pop where u clicked with the lat and lng
    // marker.bindPopup('<b>Your Location</b>').openPopup()
    const geocoding = async address => {
      const geocoder = new Nominatim()

      const latlong = await geocoder.search({ q: address })
      console.log('latlon', latlong)
    }

    geocoding('Shoppers Stop,kannur')

    // routingControlRef.current = Leaflet.Routing.control({
    //   waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)],
    //   routeWhileDragging: true
    //   // geocoder: Leaflet.Control.Geocoder.Nominatim()
    // }).addTo(mapRef.current)
    // const popup = Leaflet.popup()
    let location = []
    function success (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      setLiveLocation({ latitude, longitude })
      location = [latitude, longitude]
      console.log('liveLocation', liveLocation)
      console.log(latitude, longitude)
    }
    function error () {
      // status.textContent = 'Unable to retrieve your location'
    }

    // if (!navigator.geolocation) {
    //   // status.textContent = 'Geolocation is not supported by your browser'
    // } else {
    //   // status.textContent = 'Locating…'
    //   navigator.geolocation.getCurrentPosition(success, error)
    // }

    const removeRoutingControl = () => {
      if (routingControlRef.current != null) {
        mapRef.current.removeControl(routingControlRef.current)
        routingControlRef.current = null
      }
    }

    async function onMapClick (e) {
      navigator.geolocation.getCurrentPosition(success, error)
      if (routingControlRef.current != null) removeRoutingControl()
      console.log('location', location)
      routingControlRef.current = Leaflet.Routing.control({
        waypoints: [Leaflet.latLng(position), Leaflet.latLng(location)],
        routeWhileDragging: true
        // geocoder: Leaflet.Control.Geocoder.Nominatim()
      }).addTo(mapRef.current)

      // popup
      //   .setLatLng(e.latlng)
      //   .setContent('You clicked the map at ' + e.latlng.toString())
      //   .openOn(mapRef.current)
      // mapRef.current.removeLayer(marker)
      // marker = Leaflet.marker(e.latlng).addTo(mapRef.current)
    }

    mapRef.current.on('click', onMapClick)
  }

  // useEffect(() => {
  //   if (routingControlRef.current != null) removeRoutingControl()

  //   routingControlRef.current = Leaflet.Routing.control({
  //     waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)],
  //     routeWhileDragging: true
  //     // geocoder: Leaflet.Control.Geocoder.Nominatim()
  //   }).addTo(mapRef.current)
  // }, [liveLocation])

  useEffect(() => {
    map()
    setTimeout(() => {
      setPackingStatus(true)
      socket = io(endpoint)
      socket.emit('deliveryPartnerRequired', 'Shoppers Stop')
    }, 5000)
  }, [])

  useEffect(() => {
    socket.on('partnerAssigned', partnerName => {
      console.log(partnerName)
      setDeliveryPartnerName(partnerName)
    })
    socket.on('orderPickedUp', () => {
      setOrderPickStatus(true)
    })
    socket.on('orderDelivered', () => {
      setOrderCompleted(true)
    })
    socket.on('deliveryLiveLocation', location => {
      console.log(location)
      setLiveLocation(location)
      const bikeIcon = Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: '/images/bikeImg.jpg',
        shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png'
      })
      Leaflet.marker([liveLocation.latitude, liveLocation.longitude], {
        icon: bikeIcon
      }).addTo(mapRef.current)
      console.log('lat', liveLocation.latitude)
      console.log('long', liveLocation.longitude)
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
      {/* <div className='order-details-invoice-container'>
        <div className='order-address-container'>
          <h4>Order Details</h4>
          <p>address1</p>
          <p>address2</p>
        </div>
        <div className='invoice-container'></div>
      </div> */}
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

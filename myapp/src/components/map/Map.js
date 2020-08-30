import React, { useState, useRef, useEffect } from 'react'
import './Map.css'
// import 'leaflet/dist/leaflet.css'

import Leaflet from 'leaflet'
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet-routing-machine'

import Nominatim from 'nominatim-geocoder'

import Navbar from '../navbar/Navbar'

export default function Map ({ location }) {
  console.log('LOCation:', location)
  const [liveLocation, setLiveLocation] = useState({
    latitude: '',
    longitude: ''
  })
  const position = [11.858762, 75.404577]
  const position2 = [11.877094, 75.372391]
  // const position2 = [liveLocation.latitude, liveLocation.longitude]
  // const mapRef = useRef(null)
  // const leafletIcon = Leaflet.Icon.extend({
  //   options: {
  //     shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
  //     iconSize: [25, 41],
  //     iconAnchor: [10, 41],
  //     popupAnchor: [2, -40]
  //   }
  // })

  // const secondIcon = new leafletIcon({
  //   iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png'
  // })

  // Making a map and tiles
  let mymap
  const map = () => {
    // mapRef.current = Leaflet.map('mapid').setView(position, 13)
    mymap = Leaflet.map('mapid').setView(position, 13)

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mymap)

    // making two markers and showing popup
    const marker = Leaflet.marker(position).addTo(mymap)
    const bikeIcon = Leaflet.marker(position2).addTo(mymap)
    mymap.on('click', onMapClick) // will show a pop where u clicked with the lat and lng
    marker.bindPopup('<b>Your Location</b>').openPopup()
    const geocoding = async address => {
      // let res = await fetch(
      //   `https://nominatim.openstreetmap.org/search/${address}?format=json&addressdetails=1&limit=1&polygon_svg=1`
      // )

      const geocoder = new Nominatim()

      const latlong = await geocoder.search({ q: address })
      console.log('latlon', latlong)

      // let result = await res.json()
      // console.log('location', result[0].lat, result[0].lon)
    }

    geocoding('geekskool,bangalore')
    // Leaflet.Control.geocoder().addTo(map)

    // const latlngs = [position, position2]
    // console.log(Leaflet)
    Leaflet.Routing.control({
      waypoints: [
        // Leaflet.latLng(11.858762, 75.404577),
        // Leaflet.latLng(11.877094, 75.372391)
        Leaflet.latLng(position),
        Leaflet.latLng(position2)
      ],
      routeWhileDragging: true
      // geocoder: Leaflet.Control.Geocoder.Nominatim()
    }).addTo(mymap)
  }
  useEffect(() => {
    map()
  }, [])

  const popup = Leaflet.popup()

  function onMapClick (e) {
    popup
      .setLatLng(e.latlng)
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(mymap)
  }

  // for getting geolocation
  function success (position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    console.log(latitude, longitude)
  }
  function error () {
    // status.textContent = 'Unable to retrieve your location'
  }

  if (!navigator.geolocation) {
    // status.textContent = 'Geolocation is not supported by your browser'
  } else {
    // status.textContent = 'Locating…'
    navigator.geolocation.getCurrentPosition(success, error)
  }

  // mymap.on('click', onMapClick)
  return (
    <div className='track-order-page'>
      <Navbar />
      <div className='track-order-container'>
        <div className='track-title-container'>
          <h3>Track Your Order</h3>
        </div>
        <div className='map-delivery-detail'>
          <div id='mapid' />
          <div className='delivery-process-details-container'>
            <div className='order-details'>
              <input type='checkbox' checked={false} /> <p>Order received</p>
            </div>

            <div className='order-details'>
              <input type='checkbox' checked={false} />{' '}
              <p>Items are being packed</p>
            </div>

            <div className='order-details'>
              <input type='checkbox' checked={false} />{' '}
              <p>Look for a partner</p>
            </div>

            <div className='order-details'>
              <input type='checkbox' checked={false} /> <p>Order picked up</p>
            </div>

            <div className='order-details'>
              <input type='checkbox' checked={false} /> <p>Delivered</p>
            </div>
          </div>
        </div>
      </div>
      <div className='order-details-invoice-container'>
        <div className='order-address-container'>
          <h4>Order Details</h4>
          <p>address1</p>
          <p>address2</p>
        </div>
        <div className='invoice-container'></div>
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

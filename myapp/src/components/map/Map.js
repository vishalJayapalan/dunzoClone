import React, { useState, useRef, useEffect } from 'react'
import './Map.css'
import Leaflet from 'leaflet'
// import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'

export default function Map ({ location }) {
  console.log(location)
  const position = [11.874477, 75.370369]
  // const position2 = [liveLocation.latitude, liveLocation.longitude]
  const mapRef = useRef(null)
  const map = () => {
    mapRef.current = Leaflet.map('mapid').setView(position, 13)

    Leaflet.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(mapRef.current)

    Leaflet.marker(position).addTo(mapRef.current)
  }
  useEffect(() => {
    map()
  }, [])
  return (
    <div classname='checkoutContainer'>
      <div id='mapid'></div>
    </div>
  )
}

// import React from 'react'

// import L from 'leaflet'
// import './Map.css'
// import 'leaflet/dist/leaflet.css'

// import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// export default function CheckOut () {
//   const position = [11.874477, 75.370369]
// const icon = L.icon({
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
//   iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png'
// })
//   const map = (
//     <Map center={position} zoom={13} style={{ height: '600px' }}>
//       <TileLayer
//         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup.
//           <br />
//           Easily customizable.
//         </Popup>
//       </Marker>
//     </Map>
//   )

//   return <div>{map}</div>
// }

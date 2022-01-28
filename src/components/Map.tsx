import React from 'react'
import { Case } from '../types'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { icon } from 'leaflet'

const ICON = icon({ iconUrl: './marker.svg', iconSize: [16, 16] })

interface Props {
  countryMonth: Case
}

const Map: React.FunctionComponent<Props> = ({ countryMonth }) => {
  return (
    <MapContainer
      center={[parseInt(countryMonth.Lat), parseInt(countryMonth.Lon)]}
      zoom={1}
      scrollWheelZoom={false}
      style={{ height: 200, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={[parseInt(countryMonth.Lat), parseInt(countryMonth.Lon)]}>
        <Popup>
          {countryMonth.Country}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map

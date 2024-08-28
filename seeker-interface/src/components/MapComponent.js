// src components MapComponent.js
import React from 'react'; // Ensure React is imported
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported

function MapComponent({ properties }) {
  return (
    <MapContainer center={[-1.2921, 36.8219]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {properties.map((property) => (
        <Marker key={property.id} position={[property.latitude, property.longitude]}>
          <Popup>{property.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;

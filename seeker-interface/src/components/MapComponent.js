// src/components/MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

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

// src/components/PropertyList.js
import React from 'react';

function PropertyList({ properties }) {
  return (
    <div>
      <h2>Available Properties</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>{property.title} - ${property.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;

// src/components/PropertyForm.js
import React, { useState } from 'react';

function PropertyForm({ onSubmit }) {
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(property);
    setProperty({
      title: '',
      description: '',
      price: '',
      bedrooms: '',
      bathrooms: '',
      latitude: '',
      longitude: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={property.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={property.description} onChange={handleChange} placeholder="Description" required />
      <input name="price" type="number" value={property.price} onChange={handleChange} placeholder="Price" required />
      <input name="bedrooms" type="number" value={property.bedrooms} onChange={handleChange} placeholder="Bedrooms" required />
      <input name="bathrooms" type="number" value={property.bathrooms} onChange={handleChange} placeholder="Bathrooms" required />
      <input name="latitude" type="number" value={property.latitude} onChange={handleChange} placeholder="Latitude" required />
      <input name="longitude" type="number" value={property.longitude} onChange={handleChange} placeholder="Longitude" required />
      <button type="submit">Add Property</button>
    </form>
  );
}

export default PropertyForm;
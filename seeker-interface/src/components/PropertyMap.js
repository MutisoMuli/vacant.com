import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function PropertyMap() {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [properties, setProperties] = useState([]);
  const [radius, setRadius] = useState(5); // Default 5km radius

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCenter(userLocation);
          fetchProperties(userLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const fetchProperties = async (location) => {
    try {
      const response = await axios.get('/api/seeker/nearby-properties', {
        params: {
          latitude: location.lat,
          longitude: location.lng,
          radius: radius
        }
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleRadiusChange = (e) => {
    const newRadius = parseInt(e.target.value);
    setRadius(newRadius);
    fetchProperties(center);
  };

  return (
    <div>
      <h2>Find Nearby Properties</h2>
      <div>
        <label>Search Radius (km): </label>
        <input
          type="range"
          min="1"
          max="50"
          value={radius}
          onChange={handleRadiusChange}
        />
        <span>{radius} km</span>
      </div>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
        >
          <Marker position={center} />
          <Circle
            center={center}
            radius={radius * 1000} // Convert km to meters
            options={{
              fillColor: 'lightblue',
              fillOpacity: 0.3,
              strokeColor: 'blue',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{ lat: property.latitude, lng: property.longitude }}
              title={property.address}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <div>
        <h3>Nearby Properties:</h3>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>{property.address} - {property.propertyType}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PropertyMap;
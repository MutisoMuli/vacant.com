import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function PropertyMap() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 11
  });
  const [properties, setProperties] = useState([]);
  const [radius, setRadius] = useState(5); // Default 5km radius

  useEffect(() => {
    const fetchProperties = async (location) => {
      try {
        const response = await axios.get('/api/seeker/nearby-properties', {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            radius: radius
          }
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setViewport((prev) => ({
            ...prev,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          }));
          fetchProperties(userLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Cleanup function if needed
    return () => {
      // Cancel any ongoing requests or clean up resources if necessary
    };
  }, [radius]); // Fetch properties when radius changes

  const handleRadiusChange = (e) => {
    const newRadius = parseInt(e.target.value);
    setRadius(newRadius);
  };

  return (
    <div className="text-navy-blue">
      <h2 className="text-navy-blue">Find Nearby Properties</h2>
      <div className="mb-4">
        <label className="text-navy-blue">Search Radius (km): </label>
        <input
          type="range"
          min="1"
          max="50"
          value={radius}
          onChange={handleRadiusChange}
          className="accent-navy-600"
        />
        <span>{radius} km</span>
      </div>
      <Map
        {...viewport}
        style={containerStyle}
        mapboxAccessToken="pk.eyJ1IjoiYW50b211bGkiLCJhIjoiY2x6djVkeHloMDN6NTJtczJzejZwYml1ciJ9.AXoIJyK2JC9PoSKgZOPTkA"
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <NavigationControl />
        <ScaleControl />
        <GeolocateControl />

        <Marker latitude={viewport.latitude} longitude={viewport.longitude} color="red" />

        {properties.map((property) => (
          <Marker
            key={property.id}
            latitude={property.latitude}
            longitude={property.longitude}
            color="blue"
          />
        ))}
      </Map>
      <div className="mt-4">
        <h3 className="text-navy-blue">Nearby Properties:</h3>
        <ul>
          {properties.map((property) => (
            <li key={property.id} className="text-navy-blue">
              {property.address} - {property.propertyType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PropertyMap;

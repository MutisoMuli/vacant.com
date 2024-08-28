// src components MapComponent.js
import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import { geocodeReverse } from './geocodeReverse';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const initialCenter = {
  latitude: -3.745,
  longitude: -38.523,
};

const MapComponent = ({ formData, setFormData }) => {
  const [mapCenter, setMapCenter] = useState(initialCenter);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setFormData((prevData) => ({
            ...prevData,
            latitude: userLocation.latitude.toString(),
            longitude: userLocation.longitude.toString(),
          }));
          setMapCenter(userLocation);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setMapCenter(initialCenter);
        }
      );
    }
  }, [setFormData]);

  const handleMapClick = (event) => {
    const { lngLat } = event;
    setFormData({
      ...formData,
      latitude: lngLat.lat.toString(),
      longitude: lngLat.lng.toString(),
    });
    setMapCenter({ latitude: lngLat.lat, longitude: lngLat.lng });
  };

  const handleMarkerDrag = async (event) => {
    const { lngLat } = event;
    const address = await geocodeReverse(lngLat.lat, lngLat.lng);
    setFormData((prevData) => ({
      ...prevData,
      address,
      latitude: lngLat.lat.toString(),
      longitude: lngLat.lng.toString(),
    }));
    setMapCenter({ latitude: lngLat.lat, longitude: lngLat.lng });
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Map
        {...mapCenter}
        onClick={handleMapClick}
        style={containerStyle}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={'pk.eyJ1IjoiYW50b211bGkiLCJhIjoiY2x6djVkeHloMDN6NTJtczJzejZwYml1ciJ9.AXoIJyK2JC9PoSKgZOPTkA'}
      >
        <NavigationControl />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        <Marker
          longitude={parseFloat(formData.longitude) || mapCenter.longitude}
          latitude={parseFloat(formData.latitude) || mapCenter.latitude}
          draggable
          onDragEnd={handleMarkerDrag}
        />
      </Map>
    </div>
  );
};

export default MapComponent;

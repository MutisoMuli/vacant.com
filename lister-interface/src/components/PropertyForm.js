import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Card, CardContent } from './ui/card';
import { CardHeader } from './ui/card-header';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Camera } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    latitude: '',
    longitude: '',
    propertyType: '',
    size: '',
    condition: '',
    availableStatus: true,
    ownerContact: '',
    images: [],
  });

  const [watchId, setWatchId] = useState(null);

  const startWatchingLocation = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setFormData(prevData => ({
            ...prevData,
            latitude: userLocation.lat.toString(),
            longitude: userLocation.lng.toString()
          }));
          setMapCenter(userLocation);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
      setWatchId(id);
    }
  };

  useEffect(() => {
    startWatchingLocation();
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const [mapCenter, setMapCenter] = useState(center);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleMapClick = (e) => {
    setFormData({
      ...formData,
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    });
    setMapCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          formData.images.forEach(image => data.append('images', image));
        } else {
          data.append(key, formData[key]);
        }
      });

      const response = await fetch('/api/properties', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Property added:', result);
        // Reset form or show success message
      } else {
        console.error('Error adding property');
      }
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Add Property</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <Input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} placeholder="Property Type" />
          <Input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Size" />
          <Input type="text" name="condition" value={formData.condition} onChange={handleChange} placeholder="Condition" />
          <div className="flex items-center">
            <Checkbox
              id="availableStatus"
              checked={formData.availableStatus}
              onCheckedChange={(checked) => setFormData({ ...formData, availableStatus: checked })}
            />
            <label htmlFor="availableStatus" className="ml-2">Available</label>
          </div>
          <Input type="text" name="ownerContact" value={formData.ownerContact} onChange={handleChange} placeholder="Owner Contact" />
          
          <div>
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex items-center space-x-2 text-blue-500">
                <Camera size={24} />
                <span>Upload Images</span>
              </div>
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Property ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          )}

          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={15}
              onClick={handleMapClick}
            >
              {formData.latitude && formData.longitude && (
                <Marker
                  position={{
                    lat: parseFloat(formData.latitude),
                    lng: parseFloat(formData.longitude)
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>

          <div className="flex space-x-2">
            <Input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              readOnly
            />
            <Input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              readOnly
            />
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
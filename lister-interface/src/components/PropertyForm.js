import React, { useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import { Card, CardContent } from './ui/card';
import { CardHeader } from './ui/card-header';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Camera, MapPin, Trash2 } from 'lucide-react';
import { geocodeReverse } from './geocodeReverse';
import { getCurrentUserId } from './auth';
import { ClipLoader } from "react-spinners";
import { useTranslation } from 'react-i18next';


const containerStyle = {
  width: '100%',
  height: '400px',
};

const initialCenter = {
  latitude: -3.745,
  longitude: -38.523,
};

const PropertyForm = () => {

  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    address: '',
    latitude: '',
    longitude: '',
    propertyType: '',
    price: '',
    bedrooms: 1,
    bathrooms: 1,
    availableStatus: true,
    ownerContact: '',
    images: [],
  });

  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [locationSet, setLocationSet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  }, []);

  const handleLocationClick = async () => {
    if (locationSet) {
      setFormData((prevData) => ({
        ...prevData,
        address: '',
        latitude: '',
        longitude: '',
      }));
      setLocationSet(false);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          const address = await geocodeReverse(userLocation.latitude, userLocation.longitude);
          setFormData((prevData) => ({
            ...prevData,
            address: address,
            latitude: userLocation.latitude.toString(),
            longitude: userLocation.longitude.toString(),
          }));
          setMapCenter(userLocation);
          setLocationSet(true);
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      const formattedValue = value.replace(/\D/g, "");
      const withCommas = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setFormData({ ...formData, [name]: withCommas });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'images') {
          formData.images.forEach((image) => data.append('images', image));
        } else {
          data.append(key, formData[key]);
        }
      });
  
      // Make sure you're including all necessary fields, especially lister_id
      // data.append('lister_id', getCurrentUserId()); // You need to implement this function
      data.append('title', formData.address); // Assuming you want to use address as the title
  
      const response = await fetch('http://localhost:5000/routes/properties', {
        method: 'POST',
        body: data,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Property added:', result);
        alert('Property successfully added!');
        handleDelete(); // Reset the form
      } else {
        const errorData = await response.json();
        console.error('Error adding property:', errorData);
        alert(`Error adding property: ${errorData.details || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error adding property:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    if (!formData.address || !formData.propertyType || !formData.price) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };
  

  const handleDelete = () => {
    setFormData({
      address: '',
      latitude: '',
      longitude: '',
      propertyType: '',
      price: '',
      bedrooms: 1,
      bathrooms: 1,
      availableStatus: true,
      ownerContact: '',
      images: [],
    });
    setMapCenter(initialCenter);
    setLocationSet(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>

        <h1 className="text-2xl font-bold">{t('Add Property')}</h1>
 
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              name="address"
              value={formData.address || 'Enter location'}
              onChange={handleChange}
              placeholder="Enter location"
              readOnly
            />
            <MapPin
              size={24}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleLocationClick}
            />
          </div>

          <div>
            <label htmlFor="propertyType">Property Type</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Mansion">Mansion</option>
              <option value="Airbnb">Airbnb</option>
              <option value="Subletting">Subletting</option>
              <option value="Servant quarters">Servant quarters</option>
              <option value="Office">Office</option>
            </select>
          </div>

          <div>
            <label htmlFor="price">Price (in shillings)</label>
            <Input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price in KSH"
            />
          </div>

          <div>
            <label htmlFor="bedrooms">Bedrooms</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, bedrooms: Math.max(1, (prev.bedrooms || 1) - 1) }))}
                className="px-3 py-2 border border-gray-300 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms || 1}
                onChange={(e) => setFormData({ ...formData, bedrooms: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-16 text-center border-t border-b border-gray-300"
                min="1"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, bedrooms: (prev.bedrooms || 1) + 1 }))}
                className="px-3 py-2 border border-gray-300 rounded-r"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="bathrooms">Bathrooms</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, bathrooms: Math.max(1, (prev.bathrooms || 1) - 1) }))}
                className="px-3 py-2 border border-gray-300 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms || 1}
                onChange={(e) => setFormData({ ...formData, bathrooms: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-16 text-center border-t border-b border-gray-300"
                min="1"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, bathrooms: (prev.bathrooms || 1) + 1 }))}
                className="px-3 py-2 border border-gray-300 rounded-r"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="availableStatus"
                checked={formData.availableStatus}
                onCheckedChange={(checked) => setFormData({ ...formData, availableStatus: checked })}
              />
              <label htmlFor="availableStatus" className="ml-2">Available</label>
            </div>
            <Button 
              type="button" 
              onClick={handleDelete} 
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Trash2 size={20} className="mr-2" />
              Delete
            </Button>
          </div>

          <Input
            type="text"
            name="ownerContact"
            value={formData.ownerContact}
            onChange={handleChange}
            placeholder="Owner Contact"
          />

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

          <Map
            {...mapCenter}
            mapboxAccessToken="pk.eyJ1IjoiYW50b211bGkiLCJhIjoiY2x6djVkeHloMDN6NTJtczJzejZwYml1ciJ9.AXoIJyK2JC9PoSKgZOPTkA"
            onClick={handleMapClick}
            style={containerStyle}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            <NavigationControl />
            <GeolocateControl />
            <Marker latitude={mapCenter.latitude} longitude={mapCenter.longitude} color="red" />
          </Map>

          <Marker
            latitude={mapCenter.latitude}
            longitude={mapCenter.longitude}
            color="red"
            draggable
            onDragEnd={handleMarkerDrag}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isSubmitting ? <ClipLoader size={24} color="#fff" /> : 'Submit'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
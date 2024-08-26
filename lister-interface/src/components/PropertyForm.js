import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty } from '../redux/actions/propertyActions';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import { Card, CardContent } from './ui/card';
import { CardHeader } from './ui/card-header';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
//import { Button } from './ui/button';
import { MapPin, Trash2 } from 'lucide-react';
import { geocodeReverse } from './geocodeReverse';
//import { getCurrentUserId } from './auth';
import { ClipLoader } from "react-spinners";
import Resizer from 'react-image-file-resizer';

const containerStyle = {
  width: '100%',
  height: '800px',
};

const initialCenter = {
  latitude: -3.745,
  longitude: -38.523,
};

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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

  const dispatch = useDispatch();
  const propertyState = useSelector((state) => state.property);

  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [locationSet, setLocationSet] = useState(false);
  //const [isSubmitting, setIsSubmitting] = useState(false);

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
          setLocationSet(true);
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

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800, // max width
      800, // max height
      'JPEG',
      70, // quality
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = 5 - formData.images.length;
    const filesToUpload = files.slice(0, remainingSlots);
  
    for (const file of filesToUpload) {
      const resizedImage = await resizeFile(file);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, resizedImage]
      }));
    }
  
    if (files.length > remainingSlots) {
      alert(`Only ${remainingSlots} image(s) can be added. The maximum limit is 5 images.`);
    }
  };
  const validateForm = () => {
    if (!formData.address || !formData.propertyType || !formData.price) {
      alert('Please fill in all required fields.');
      return false;
    }
    if (formData.images.length > 5) {
      alert('You can upload a maximum of 5 images.');
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }
    console.log("Dispatching addProperty action", formData);
    dispatch(addProperty(formData));
  };

  const handleDelete = () => {
    setFormData({
      title: '',
      description: '',
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
        <h1 className="text-2xl font-bold">Add Property</h1>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>

          <div className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

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
                onClick={() => setFormData(prev => ({ ...prev, bedrooms: Math.max(1, Math.min(5, (prev.bedrooms || 1) - 1)) }))}
                className="px-3 py-2 border border-gray-300 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="text-center w-full p-2 border-t border-b border-gray-300"
                min="1"
                max="5"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, bedrooms: Math.min(5, (prev.bedrooms || 1) + 1) }))}
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
                  onClick={() => setFormData(prev => ({ ...prev, bathrooms: Math.max(1, Math.min(5, (prev.bathrooms || 1) - 1)) }))}
                  className="px-3 py-2 border border-gray-300 rounded-l"
                >
                  -
                </button>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-16 text-center w-full p-2 border-t border-b border-gray-300"
                  min="1"
                  max="5"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, bathrooms: Math.min(5, (prev.bathrooms || 1) + 1) }))}
                  className="px-3 py-2 border border-gray-300 rounded-r"
                >
                  +
                </button>
              </div>
            </div>

          <div className="flex items-center space-x-4">
            <Checkbox
              id="availableStatus"
              name="availableStatus"
              checked={formData.availableStatus}
              onChange={(e) => setFormData({ ...formData, availableStatus: e.target.checked })}
            />
            <label htmlFor="availableStatus">Available</label>
          </div>

          <div>
            <label htmlFor="ownerContact">Owner Contact</label>
            <Input
              type="text"
              id="ownerContact"
              name="ownerContact"
              value={formData.ownerContact}
              onChange={handleChange}
              placeholder="Enter owner contact"
            />
          </div>

          <div>
            <label htmlFor="images">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="p-2 border border-gray-300 rounded"
            />
            <div className="flex flex-wrap mt-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative w-24 h-24 mr-2 mb-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="object-cover w-full h-full rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }))}
                    className="absolute top-0 right-0 p-1 bg-white border border-gray-300 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 border border-gray-300 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Clear Form
          </button>

          <button
            type="submit"
            disabled={propertyState.loading}
            className="px-4 py-2 border border-gray-300 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {propertyState.loading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              'Submit'
            )}
          </button>

          <div className="mt-4 mb-6">
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
                onGeolocate={(position) => {
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
                }}
               />
              <Marker
                longitude={parseFloat(formData.longitude) || mapCenter.longitude}
                latitude={parseFloat(formData.latitude) || mapCenter.latitude}
                draggable
                onDragEnd={handleMarkerDrag}
              />
            </Map>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;

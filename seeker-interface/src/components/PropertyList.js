import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch the properties from the API
    axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the properties!', error);
      });
  }, []);

  return (
    <div>
      <h1>Property List</h1>
      <ul>
        {properties.map(property => (
          <li key={property.propertyID}>
            <h2>{property.address}</h2>
            <p>Type: {property.propertyType}</p>
            <p>Size: {property.size} sq ft</p>
            <p>Condition: {property.condition}</p>
            <p>Available: {property.availableStatus ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;

import React, { useEffect, useState } from 'react';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch the list of properties from your backend API
    fetch('/api/properties')
      .then((response) => response.json())
      .then((data) => setProperties(data))
      .catch((error) => console.error('Error fetching properties:', error));
  }, []);

  return (
    <div>
      <h1>Property List</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.propertyID}>
            <h2>{property.address}</h2>
            <p>Type: {property.propertyType}</p>
            <p>Size: {property.size} sq ft</p>
            <p>Condition: {property.condition}</p>
            <p>Available: {property.availableStatus ? 'Yes' : 'No'}</p>
            <p>Owner Contact: {JSON.stringify(property.ownerContact)}</p>
            <p>Last Updated: {new Date(property.lastUpdated).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;

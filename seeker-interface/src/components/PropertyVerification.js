import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyVerification() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchUnverifiedProperties();
  }, []);

  const fetchUnverifiedProperties = async () => {
    try {
      const response = await axios.get('/api/properties/unverified');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching unverified properties:', error);
    }
  };

  const verifyProperty = async (propertyId) => {
    try {
      await axios.post(`/api/properties/${propertyId}/verify`);
      fetchUnverifiedProperties();
    } catch (error) {
      console.error('Error verifying property:', error);
    }
  };

  return (
    <div className="property-verification">
      <h2 className="text-orange-600 font-semibold">Property Verification</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id} className="text-orange-600 font-semibold">
            {property.address}
            <button className="ml-4 bg-orange-600 text-white font-semibold py-1 px-3 rounded hover:bg-orange-700"
            onClick={() => verifyProperty(property.id)}>
            Verify
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyVerification;
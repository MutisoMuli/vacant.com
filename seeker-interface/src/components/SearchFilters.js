//SearchFilters.js
import React, { useState } from 'react';

function SearchFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form className="search-filters bg-orange-300 p-4 rounded" onSubmit={handleSubmit}>
      <select name="propertyType" onChange={handleChange} value={filters.propertyType} className="bg-blue-200 p-2 rounded">
      <option value="">All Types</option>
      <option value="apartment">Apartment</option>
      <option value="house">House</option>
      <option value="mansion">Mansion</option>
      <option value="Airbnb">Airbnb</option>
      <option value="subletting">Subletting</option>
      <option value="servant quarters">Servant quarters</option>
      <option value="office">Office</option>
    </select>
    <input
      type="number"
      name="minPrice"
      placeholder="Min Price"
      onChange={handleChange}
      value={filters.minPrice}
      className="bg-orange-100 p-2 rounded"
    />
    <input
      type="number"
      name="maxPrice"
      placeholder="Max Price"
      onChange={handleChange}
      value={filters.maxPrice}
      className="bg-orange-100 p-2 rounded"
    />
    <input
      type="number"
      name="bedrooms"
      placeholder="Bedrooms"
      onChange={handleChange}
      value={filters.bedrooms}
      className="bg-orange-100 p-2 rounded"
    />
    <input
      type="number"
      name="bathrooms"
      placeholder="Bathrooms"
      onChange={handleChange}
      value={filters.bathrooms}
      className="bg-orange-100 p-2 rounded"
    />
    <button type="submit" className="bg-orange-400 text-white p-2 rounded">Apply Filters</button>
</form>
  );
}

export default SearchFilters;
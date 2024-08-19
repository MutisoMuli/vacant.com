// src/components/geocodeReverse.js
export async function geocodeReverse(latitude, longitude) {
    const mapboxToken = 'pk.eyJ1IjoiYW50b211bGkiLCJhIjoiY2x6djVkeHloMDN6NTJtczJzejZwYml1ciJ9.AXoIJyK2JC9PoSKgZOPTkA';
    
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch address from coordinates');
    }
    
    const data = await response.json();
    const placeName = data.features[0]?.place_name || 'Unknown location';
  
    return placeName;
  }
  
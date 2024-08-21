const express = require('express');
const router = express.Router();
const { Property } = require('../models');
const { Op } = require('sequelize');
const { calculateDistance } = require('../utils/distance'); // You'll need to implement this

router.get('/nearby-properties', async (req, res) => {
  try {
    const { latitude, longitude, radius = 5 } = req.query; // radius in kilometers, default 5km

    // Convert latitude and longitude to numbers
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    // Calculate the bounding box for the initial query
    const earthRadius = 6371; // Earth's radius in kilometers
    const latChange = (radius / earthRadius) * (180 / Math.PI);
    const lonChange = (radius / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180);

    const properties = await Property.findAll({
      where: {
        latitude: { [Op.between]: [lat - latChange, lat + latChange] },
        longitude: { [Op.between]: [lon - lonChange, lon + lonChange] },
        availableStatus: true
      }
    });

    // Filter properties within the exact radius
    const nearbyProperties = properties.filter(property => 
      calculateDistance(lat, lon, property.latitude, property.longitude) <= radius
    );

    res.json(nearbyProperties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error finding nearby properties' });
  }
});

module.exports = router;
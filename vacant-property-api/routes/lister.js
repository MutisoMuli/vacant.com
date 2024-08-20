const express = require('express');
const router = express.Router();
const { Property } = require('../models');
const { validateAddress } = require('../utils/googleMapsApi'); // You'll need to implement this

router.post('/post-property', async (req, res) => {
  try {
    const { address, propertyType, size, condition, ownerContact } = req.body;

    // Validate and geocode the address using Google Maps API
    const locationData = await validateAddress(address);
    if (!locationData) {
      return res.status(400).json({ message: 'Invalid address' });
    }

    const newProperty = await Property.create({
      address,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      propertyType,
      size,
      condition,
      ownerContact,
      lastUpdated: new Date()
    });

    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting property' });
  }
});

module.exports = router;
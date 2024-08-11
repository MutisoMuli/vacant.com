const express = require('express');
const router = express.Router();
const { Property } = require('../models');

// POST a new property
router.post('/', async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add more routes for GET by ID, PUT, DELETE, etc.
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Property = sequelize.define('Property', {
    propertyID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: DataTypes.INTEGER,
    condition: DataTypes.STRING,
    availableStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    ownerContact: DataTypes.JSONB,
    lastUpdated: DataTypes.DATE
  });

  return Property;
};

module.exports = router;
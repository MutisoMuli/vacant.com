const { Property } = require('../models');
const { Op } = require('sequelize');
const { calculateDistance } = require('../utils/distance');

module.exports = {
  getAllProperties: async () => {
    return await Property.findAll();
  },

  getPropertyById: async (id) => {
    return await Property.findByPk(id);
  },

  createProperty: async (propertyData, userId) => {
    return await Property.create({ ...propertyData, userId });
  },

  updateProperty: async (id, propertyData) => {
    const property = await Property.findByPk(id);
    if (!property) {
      return null;
    }
    await property.update(propertyData);
    return property;
  },

  getNearbyProperties: async (latitude, longitude, radius) => {
    const properties = await Property.findAll();
    return properties.filter(property => 
      calculateDistance(latitude, longitude, property.latitude, property.longitude) <= radius
    );
  },

  deleteProperty: async (id) => {
    const property = await Property.findByPk(id);
    if (!property) {
      return null;
    }
    await property.destroy();
    return property;
  }
};
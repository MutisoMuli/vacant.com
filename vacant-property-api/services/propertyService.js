const { Property } = require('../models');

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

  deleteProperty: async (id) => {
    const property = await Property.findByPk(id);
    if (!property) {
      return null;
    }
    await property.destroy();
    return property;
  }
};
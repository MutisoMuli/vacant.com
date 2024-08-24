const { Property } = require('../models');

// Get all properties
exports.getAllProperties = async () => {
    return await Property.findAll();
};

// Get a property by ID
exports.getPropertyById = async (id) => {
    return await Property.findByPk(id);
};

// Create a new property
exports.createProperty = async (propertyData, userId) => {
    return await Property.create({ ...propertyData, userId });
};

// Update an existing property
exports.updateProperty = async (id, propertyData) => {
    const property = await Property.findByPk(id);
    if (!property) {
        return null;
    }
    await property.update(propertyData);
    return property;
};

// Delete a property
exports.deleteProperty = async (id) => {
    const property = await Property.findByPk(id);
    if (!property) {
        return null;
    }
    await property.destroy();
    return property;
};

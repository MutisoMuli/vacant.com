const propertyService = require('../services/propertyService');

module.exports = {
  // Get all properties
  getAllProperties: async (req, res) => {
    try {
      const properties = await propertyService.getAllProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a property by ID
  getPropertyById: async (req, res) => {
    try {
      const property = await propertyService.getPropertyById(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new property
  createProperty: async (req, res) => {
    try {
      const property = await propertyService.createProperty(req.body, req.user.id);
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update an existing property
  updateProperty: async (req, res) => {
    try {
      const property = await propertyService.updateProperty(req.params.id, req.body);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a property
  deleteProperty: async (req, res) => {
    try {
      const property = await propertyService.deleteProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      res.json({ message: 'Property deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
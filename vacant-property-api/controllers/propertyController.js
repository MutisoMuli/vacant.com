const Property = require('../models/property');

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const {
      address,
      latitude,
      longitude,
      propertyType,
      price,
      bedrooms,
      bathrooms,
      availableStatus,
      ownerContact
    } = req.body;

    const newProperty = await Property.create({
      address,
      latitude,
      longitude,
      propertyType,
      price,
      bedrooms,
      bathrooms,
      availableStatus,
      ownerContact
    });

    res.status(201).json({
      success: true,
      data: newProperty
    });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the property.'
    });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json({
      success: true,
      data: properties
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching properties.'
    });
  }
};

// Get a property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property) {
      res.status(200).json({
        success: true,
        data: property
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Property not found.'
      });
    }
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the property.'
    });
  }
};

// Update a property by ID
exports.updatePropertyById = async (req, res) => {
  try {
    const updatedProperty = await Property.updateById(req.params.id, req.body);
    if (updatedProperty) {
      res.status(200).json({
        success: true,
        data: updatedProperty
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Property not found.'
      });
    }
  } catch (error) {
    console.error('Error updating property by ID:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the property.'
    });
  }
};

// Delete a property by ID
exports.deletePropertyById = async (req, res) => {
  try {
    const deletedProperty = await Property.deleteById(req.params.id);
    if (deletedProperty) {
      res.status(200).json({
        success: true,
        data: deletedProperty
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Property not found.'
      });
    }
  } catch (error) {
    console.error('Error deleting property by ID:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the property.'
    });
  }
};

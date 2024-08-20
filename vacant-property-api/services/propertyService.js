const db = require('../models');

const propertyService = {
  // Create a new property
  async createProperty(data) {
    try {
      const newProperty = await db.Property.create({
        title: data.title,
        description: data.description,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        propertyType: data.propertyType,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        available: data.available,
        ownerContact: data.ownerContact
        // lister_id removed
      });

      if (data.images && data.images.length) {
        for (let image of data.images) {
          await db.PropertyImage.create({
            propertyId: newProperty.id,
            imageUrl: image
          });
        }
      }

      return newProperty;
    } catch (error) {
      throw new Error('Error creating property: ' + error.message);
    }
  },

  // Fetch all properties
  async getAllProperties() {
    try {
      const properties = await db.Property.findAll({
        include: [{ model: db.PropertyImage, as: 'images' }]
      });
      return properties;
    } catch (error) {
      throw new Error('Error fetching properties: ' + error.message);
    }
  },

  // Fetch a property by ID
  async getPropertyById(id) {
    try {
      const property = await db.Property.findByPk(id, {
        include: [{ model: db.PropertyImage, as: 'images' }]
      });

      if (!property) {
        throw new Error('Property not found');
      }

      return property;
    } catch (error) {
      throw new Error('Error fetching property: ' + error.message);
    }
  },

  // Update a property by ID
  async updateProperty(id, data) {
    try {
      const property = await db.Property.findByPk(id);

      if (!property) {
        throw new Error('Property not found');
      }

      await property.update(data);

      if (data.images && data.images.length) {
        await db.PropertyImage.destroy({ where: { propertyId: id } });
        for (let image of data.images) {
          await db.PropertyImage.create({
            propertyId: property.id,
            imageUrl: image
          });
        }
      }

      return property;
    } catch (error) {
      throw new Error('Error updating property: ' + error.message);
    }
  },

  // Delete a property by ID
  async deleteProperty(id) {
    try {
      const property = await db.Property.findByPk(id);

      if (!property) {
        throw new Error('Property not found');
      }

      await db.PropertyImage.destroy({ where: { propertyId: id } });
      await property.destroy();

      return { message: 'Property deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting property: ' + error.message);
    }
  }
};

module.exports = propertyService;

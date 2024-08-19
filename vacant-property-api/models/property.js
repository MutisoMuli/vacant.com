const pool = require('../config/database');

class Property {
  static async create(propertyData) {
    const { address, latitude, longitude, propertyType, price, bedrooms, bathrooms, availableStatus, ownerContact } = propertyData;
    const query = `
      INSERT INTO properties (address, latitude, longitude, property_type, price, bedrooms, bathrooms, available_status, owner_contact)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;
    const values = [address, latitude, longitude, propertyType, price, bedrooms, bathrooms, availableStatus, ownerContact];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  }

  static async findAll() {
    const query = 'SELECT * FROM properties';

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error finding properties:', error);
      throw error;
    }
  }

  // Example additional method: Find a property by ID
  static async findById(id) {
    const query = 'SELECT * FROM properties WHERE id = $1';
    const values = [id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding property by ID:', error);
      throw error;
    }
  }
  
  // Example additional method: Update a property by ID
  static async updateById(id, propertyData) {
    const { address, latitude, longitude, propertyType, price, bedrooms, bathrooms, availableStatus, ownerContact } = propertyData;
    const query = `
      UPDATE properties
      SET address = $1, latitude = $2, longitude = $3, property_type = $4, price = $5, bedrooms = $6, bathrooms = $7, available_status = $8, owner_contact = $9
      WHERE id = $10
      RETURNING *`;
    const values = [address, latitude, longitude, propertyType, price, bedrooms, bathrooms, availableStatus, ownerContact, id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating property by ID:', error);
      throw error;
    }
  }

  // Example additional method: Delete a property by ID
  static async deleteById(id) {
    const query = 'DELETE FROM properties WHERE id = $1 RETURNING *';
    const values = [id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting property by ID:', error);
      throw error;
    }
  }
}

module.exports = Property;

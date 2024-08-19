const pool = require('../config/database');

class Property {
  static async create(propertyData) {
    const { address, latitude, longitude, propertyType, price, bedrooms, bathrooms, availableStatus, ownerContact } = propertyData;
    const query = 'INSERT INTO properties (address, latitude, longitude, property_type, price, bedrooms, bathrooms, available_status, owner_contact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    const values = [address, latitude, longitude, propertyType, price, bedrooms, bathrooms, availableStatus, ownerContact];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM properties';
    const result = await pool.query(query);
    return result.rows;
  }

  // Add more methods as needed
}

module.exports = Property;
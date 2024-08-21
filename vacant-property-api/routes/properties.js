const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vacant_houses',
  password: '52605260',
  port: 5432,
});

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await pool.query('SELECT * FROM properties');
    res.json(properties.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new property
router.post('/', async (req, res) => {
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
      ownerContact,
      userId,
    } = req.body;

    const imagesArray = req.files.map((file) => file.filename);

    const result = await pool.query(
      'INSERT INTO properties (address, latitude, longitude, property_type, price, bedrooms, bathrooms, available_status, owner_contact, user_id, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [
        address,
        latitude,
        longitude,
        propertyType,
        price,
        bedrooms,
        bathrooms,
        availableStatus,
        ownerContact,
        userId,
        imagesArray,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
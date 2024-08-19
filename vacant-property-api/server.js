// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'vacant_houses',
  password: 'your_password',
  port: 5432,
});

// Routes
app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/properties', async (req, res) => {
  const { title, description, price, bedrooms, bathrooms, latitude, longitude } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO properties (title, description, price, bedrooms, bathrooms, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, price, bedrooms, bathrooms, latitude, longitude]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
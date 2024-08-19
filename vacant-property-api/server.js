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
  user: 'postgres',
  host: 'localhost',
  database: 'vacant_crud',
  password: '52605260',
  port: 5432,
});

// User registration
app.post('/api/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
        [username, email, hashedPassword, role]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // User login
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (await bcrypt.compare(password, user.password_hash)) {
          res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get properties (for seekers)
  app.get('/api/properties', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM properties');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Add property (for listers)
  app.post('/api/properties', async (req, res) => {
    const { lister_id, title, description, price, bedrooms, bathrooms, latitude, longitude } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO properties (lister_id, title, description, price, bedrooms, bathrooms, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [lister_id, title, description, price, bedrooms, bathrooms, latitude, longitude]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Add to favorites (for seekers)
  app.post('/api/favorites', async (req, res) => {
    const { seeker_id, property_id } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO favorites (seeker_id, property_id) VALUES ($1, $2) RETURNING *',
        [seeker_id, property_id]
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
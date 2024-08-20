// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vacant_houses',
  password: '52605260',
  port: 5432,
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });
  
  const upload = multer({ storage: storage });
  

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
app.post('/api/properties', upload.array('images', 5), async (req, res) => {
    const { 
      lister_id,
      address,
      latitude,
      longitude,
      propertyType,
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      availableStatus,
      ownerContact
    } = req.body;
  
    const imagePaths = req.files ? req.files.map(file => file.path) : [];
  
    try {
      const result = await pool.query(
        `INSERT INTO properties 
         (lister_id, address, latitude, longitude, property_type, title, description, price, bedrooms, bathrooms, available_status, owner_contact, images) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
         RETURNING *`,
        [lister_id, address, latitude, longitude, propertyType, title, description, price, bedrooms, bathrooms, availableStatus, ownerContact, imagePaths]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error in /api/properties:', err);
      res.status(500).json({ error: 'Internal server error', details: err.message });
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
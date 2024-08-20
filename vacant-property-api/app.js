const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', require('./api/properties'));
app.use('/api/users', require('./api/users'));
app.use('/api/favorites', require('./api/favorites'));
app.use('/api/searches', require('./api/searches'));
app.use('/api/seeker', require('./api/seeker'));
app.use('/api/lister', require('./api/lister'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
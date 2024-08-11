const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/properties', require('./routes/properties'));
app.use('/api/users', require('./routes/users'));
app.use('/api/searches', require('./routes/searches'));

// New lister and seeker routes
const listerRoutes = require('./routes/lister');
const seekerRoutes = require('./routes/seeker');

app.use('/api/lister', listerRoutes);
app.use('/api/seeker', seekerRoutes);

// Sync database
const db = require('./models');
db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

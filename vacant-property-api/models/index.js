'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')[process.env.NODE_ENV || 'development'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  port: config.port,
});

// Import and initialize models
const Property = require('./property')(sequelize);  // Pass sequelize instance

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Property = Property;

// If you have associations, add them here
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;

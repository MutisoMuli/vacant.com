'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const config = require(__dirname + '/../config/config.json')[process.env.NODE_ENV || 'development'];
const db = {};

const Pool = require('pg').Pool;
const pool = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

// Add custom model classes
const Property = require('./property'); // Adjust the path if necessary

db.pool = pool;
db.Property = Property;

module.exports = db;

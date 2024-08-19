-- database.sql
CREATE DATABASE vacant_houses;

\c vacant_houses

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(10) CHECK (role IN ('seeker', 'lister')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  lister_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  latitude NUMERIC(10, 8) NOT NULL,
  longitude NUMERIC(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  seeker_id INTEGER REFERENCES users(id),
  property_id INTEGER REFERENCES properties(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(seeker_id, property_id)
);

CREATE TABLE searches (
  id SERIAL PRIMARY KEY,
  seeker_id INTEGER REFERENCES users(id),
  search_query TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
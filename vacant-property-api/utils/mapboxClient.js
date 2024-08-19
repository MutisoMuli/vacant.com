// utils/mapboxClient.js

const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapboxClient = mbxClient({ accessToken: process.env.MAPBOX_ACCESS_TOKEN });

const geocodingClient = mbxGeocoding(mapboxClient);

module.exports = geocodingClient;

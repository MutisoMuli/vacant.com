const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/nearby-properties', propertyController.getNearbyProperties);

module.exports = router;
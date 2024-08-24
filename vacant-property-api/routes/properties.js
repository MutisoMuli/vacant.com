const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/auth');

// Route to get all properties
router.get('/', propertyController.getAllProperties);

// Route to get a property by ID
router.get('/:id', propertyController.getPropertyById);

// Route to create a new property
router.post('/', auth, propertyController.createProperty);

// Route to update an existing property
router.put('/:id', auth, propertyController.updateProperty);

// Route to delete a property
router.delete('/:id', auth, propertyController.deleteProperty);

module.exports = router;

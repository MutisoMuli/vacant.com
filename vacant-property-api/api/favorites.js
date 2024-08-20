const express = require('express');
const router = express.Router();
const { Favorite, User, Property } = require('../models');

// POST a new favorite
router.post('/', async (req, res) => {
  try {
    const newFavorite = await Favorite.create(req.body);
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all favorites for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { UserID: req.params.userId },
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Property, attributes: ['address', 'propertyType', 'size'] }
      ]
    });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific favorite
router.get('/:favoriteId', async (req, res) => {
  try {
    const favorite = await Favorite.findByPk(req.params.favoriteId, {
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Property, attributes: ['address', 'propertyType', 'size'] }
      ]
    });
    if (favorite) {
      res.json(favorite);
    } else {
      res.status(404).json({ message: 'Favorite not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a favorite
router.delete('/:favoriteId', async (req, res) => {
  try {
    const result = await Favorite.destroy({
      where: { FavoriteID: req.params.favoriteId }
    });
    if (result === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { Search, User } = require('../models');

// POST a new search
router.post('/', async (req, res) => {
  try {
    const newSearch = await Search.create(req.body);
    res.status(201).json(newSearch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all searches for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const searches = await Search.findAll({
      where: { UserID: req.params.userId },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json(searches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific search
router.get('/:searchId', async (req, res) => {
  try {
    const search = await Search.findByPk(req.params.searchId);
    if (search) {
      res.json(search);
    } else {
      res.status(404).json({ message: 'Search not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a search
router.delete('/:searchId', async (req, res) => {
  try {
    const result = await Search.destroy({
      where: { SearchID: req.params.searchId }
    });
    if (result === 0) {
      return res.status(404).json({ message: 'Search not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
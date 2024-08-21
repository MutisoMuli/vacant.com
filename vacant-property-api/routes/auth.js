const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
  });

module.exports = router;
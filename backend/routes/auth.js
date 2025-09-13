const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Login-Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User nicht gefunden!' });
    }
    // Passwort mit bcrypt prüfen
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Falsches Passwort!' });
    }
    // Login erfolgreich
    res.json({ user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Serverfehler!' });
  }
});

module.exports = router;
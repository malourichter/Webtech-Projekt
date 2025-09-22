const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('FEHLER: JWT_SECRET ist nicht in der .env-Datei definiert!');
  console.error('Bitte kopiere .env.example zu .env und fülle die Werte aus.');
  process.exit(1);
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send({ message: 'Benutzer nicht gefunden.' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send({ message: 'Falsches Passwort' });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
     isAdmin: user.isAdmin
  };
  const token = jwt.sign(userWithoutPassword, JWT_SECRET, { expiresIn: '1d' });
  res.status(200).send({ token, user: userWithoutPassword });
});

module.exports = router;
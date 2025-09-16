const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./models/user.js");
const Entry = require("./models/entry.js");

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: 'Email existiert bereits.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).send({ message: 'Nutzer erfolgreich registriert.' });
});

router.delete('/user/:id', async(req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id }) 
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Benutzer existiert nicht." })
    }
});

router.get('/user', async (req, res) => {
  try {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Abrufen der Benutzer" });
  }
});


module.exports = router;
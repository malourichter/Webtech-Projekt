const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./models/user.js");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password} = req.body;

    // Prüfen, ob der Benutzer schon existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Der Benutzer existiert bereits." });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen User speichern
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Benutzer erfolgreich registiert." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
});

// delete one member via id
router.delete('/user/:id', async(req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id }) // 'user' wurde zu 'User' geändert
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
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
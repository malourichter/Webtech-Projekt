const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./models/user.js");
const jwt = require("jsonwebtoken");

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Prüfen, ob User existiert
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email oder Passwort falsch." });

    // Passwort vergleichen
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Email oder Passwort falsch." });

    // JWT erstellen
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "mein_geheimes_jwt",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login erfolgreich", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
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

module.exports = router;
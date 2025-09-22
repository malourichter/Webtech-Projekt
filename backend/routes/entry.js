const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Eintrag erstellen
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const { mood, habits, notizen, datum } = req.body;
    const userId = req.user.id; // userId aus dem Token 
    const newEntry = new Entry({ userId, mood, habits, notizen, datum });
    await newEntry.save();
    res.status(201).json({ message: "Eintrag gespeichert." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Einträge des eingeloggten Nutzers abrufen
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user.id });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Abrufen der Einträge" });
  }
});


// Einträge aller Nutzer einsehen (nur als Admin)
router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const entries = await Entry.find({});
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Abrufen der Einträge" });
  }
});



// Einträge bearbeiten
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { mood, habits, notizen } = req.body;
    const updates = {};

    if (mood) updates.mood = mood;
    if (habits) updates.habits = habits;
    if (notizen) updates.notizen = notizen;

    const entry = await Entry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Nur eigene Einträge bearbeiten
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({ message: 'Eintrag nicht gefunden' });
    }

    res.status(200).json({
      message: 'Eintrag erfolgreich aktualisiert',
      entry
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Einträge löschen
router.delete('/:id', authMiddleware, async(req, res) => {
    try {
        const result = await Entry.deleteOne({ _id: req.params.id, userId: req.user.id }); // Nur eigene Einträge löschen
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Eintrag existiert nicht oder gehört nicht Ihnen." });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
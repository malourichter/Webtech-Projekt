const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

// Eintrag erstellen
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { userId, mood, habits, notizen, datum } = req.body;
    const newEntry = new Entry({ userId, mood, habits, notizen, datum });
    await newEntry.save();
    res.status(201).json({ message: "Eintrag gespeichert." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Abrufen der Einträge" });
  }
});

router.delete('/:id', async(req, res) => {
    try {
        await Entry.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Eintrag existiert nicht." })
    }
});

module.exports = router;
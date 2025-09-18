const mongoose = require('mongoose');

//definiert Struktur, wie Einträge in DB festgelegt & gespeichert werden

const entrySchema = new mongoose.Schema({
  // ID des Nutzers
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: {
      name: String,
      image: String
    },
  habits: [{
    name: String,
    image: String,
  }],    
  notizen: String,      
  datum: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Entry", entrySchema);
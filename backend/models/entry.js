const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood:  String,
  habits: [String],    
  notizen: String,      
  datum: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Entry", entrySchema);
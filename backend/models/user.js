const mongoose = require("mongoose");
//Struktur wie User in DB festgelegt & gespeichert werden
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
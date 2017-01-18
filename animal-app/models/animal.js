const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  species: { type: String, trim: true, required: true },
  description: { type: String, trim: true }
}, {
  timestamp: true

});
module.exports = mongoose.model('Animal', animalSchema);

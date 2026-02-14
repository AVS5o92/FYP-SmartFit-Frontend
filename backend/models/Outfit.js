const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClothingItem' }],
  occasion: { type: String }, // e.g., 'casual', 'formal', 'party'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Outfit', outfitSchema);

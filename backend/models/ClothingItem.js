const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'shirt', 'pants', 'dress'
  color: { type: String },
  size: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ClothingItem', clothingItemSchema);

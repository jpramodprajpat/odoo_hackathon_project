const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  status: { type: String, default: 'pending' },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);

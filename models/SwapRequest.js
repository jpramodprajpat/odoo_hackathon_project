const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema(
    {
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'pending' }, // pending | accepted | rejected
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SwapRequest', swapRequestSchema);

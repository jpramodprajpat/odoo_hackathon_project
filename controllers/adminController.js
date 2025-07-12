const Item = require('../models/Item');

// GET all pending items
exports.getPendingItems = async (req, res) => {
  const items = await Item.find({ status: 'pending' }).populate('uploader', 'name email');
  res.json(items);
};

// APPROVE an item
exports.approveItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    item.status = 'approved';
    await item.save();

    res.json({ msg: 'Item approved successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to approve item' });
  }
};

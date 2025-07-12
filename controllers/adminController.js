const Item = require('../models/Item');

// Get all pending items
exports.getPendingItems = async (req, res) => {
  try {
    const pendingItems = await Item.find({ status: 'pending' });
    res.json(pendingItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch pending items' });
  }
};

// Approve item
exports.approveItem = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, { status: 'approved' });
    res.json({ msg: 'Item approved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to approve item' });
  }
};

// Reject item
exports.rejectItem = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json({ msg: 'Item rejected!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to reject item' });
  }
};

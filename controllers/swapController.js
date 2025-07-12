const SwapRequest = require('../models/SwapRequest');
const Item = require('../models/Item');

exports.createSwapRequest = async (req, res) => {
  try {
    const { itemId } = req.body;
    const requesterId = req.user.id;

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    // Prevent user from requesting their own item
    if (item.uploader.toString() === requesterId)
      return res.status(400).json({ msg: 'You cannot request your own item' });

    // Create swap request
    const swap = new SwapRequest({ itemId, requesterId });
    await swap.save();

    res.status(201).json({ msg: 'Swap request created successfully', swap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create swap request' });
  }
};

exports.getMyRequests = async (req, res) => {
  const requesterId = req.user.id;
  const swaps = await SwapRequest.find({ requesterId }).populate('itemId');
  res.json(swaps);
};

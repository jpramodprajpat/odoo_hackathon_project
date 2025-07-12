const Item = require('../models/Item');

// ✅ Upload an item
exports.uploadItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const userId = req.user.id;

    const item = new Item({
      title,
      description,
      imageUrl,
      category,
      type,
      size,
      condition,
      tags: tags ? tags.split(',') : [],
      uploader: userId,
      status: 'pending'
    });

    await item.save();
    res.status(201).json({ msg: 'Item uploaded successfully', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to upload item' });
  }
};

// ✅ Get all approved items (for public listing)
exports.getApprovedItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch items' });
  }
};

// ✅ Get items uploaded by current logged-in user
exports.getMyUploads = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await Item.find({ uploader: userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error("My uploads error:", err);
    res.status(500).json({ msg: "Failed to fetch your uploaded items" });
  }
};

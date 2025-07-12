const express = require('express');
const router = express.Router();
const { getPendingItems, approveItem } = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/roleMiddleware');

// GET /api/admin/pending-items → List of pending items
router.get('/pending-items', auth, isAdmin, getPendingItems);

// PUT /api/admin/approve/:id → Approve a single item
router.put('/approve/:id', auth, isAdmin, approveItem);

module.exports = router;

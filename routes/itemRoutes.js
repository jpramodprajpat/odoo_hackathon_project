const express = require('express');
const router = express.Router();
const {
  uploadItem,
  getApprovedItems,
  getMyUploads  // ✅ IMPORT THIS
} = require('../controllers/itemController');

const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // Multer config

// ✅ 1. Upload item (protected route)
router.post('/upload', auth, upload.single('image'), uploadItem);

// ✅ 2. Get approved items (public)
router.get('/', getApprovedItems);

// ✅ 3. Get current user's uploads (protected)
router.get('/my-uploads', auth, getMyUploads); // ✅ ADD THIS ROUTE

module.exports = router;

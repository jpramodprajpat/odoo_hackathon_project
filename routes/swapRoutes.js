const express = require('express');
const router = express.Router();
const { createSwapRequest, getMyRequests } = require('../controllers/swapController');
const auth = require('../middlewares/authMiddleware');

// Create a swap request
router.post('/', auth, createSwapRequest);

// Get current user's swap requests
router.get('/my-requests', auth, getMyRequests);

module.exports = router;

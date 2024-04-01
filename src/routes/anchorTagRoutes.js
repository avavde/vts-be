const express = require('express');
const router = express.Router();
const anchorTagController = require('../controllers/anchorTagController');

// Routes corresponding to the anchorTagController functionalities
router.use('/tags', anchorTagController);

module.exports = router;

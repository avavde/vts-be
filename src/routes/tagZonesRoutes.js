const express = require('express');
const router = express.Router();
const tagzones = require('../controllers/tagZonesController');

// Routes corresponding to the anchorTagController functionalities
router.use('', tagzones);

module.exports = router;
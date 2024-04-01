// dataStreamRoutes.js
const express = require('express');
const router = express.Router();
const dataStreamController = require('../controllers/dataStreamController');

// Delegate the HTTP operations to the dataStreamController
router.use('/feeds/:feedId/datastreams', dataStreamController);

module.exports = router;

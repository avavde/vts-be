const express = require('express');
const router = express.Router();
const zoneManagementController = require('../controllers/zoneManagementController');

// Building routes
router.post('/buildings', zoneManagementController);
router.put('/buildings/:buildingId', zoneManagementController);
router.delete('/buildings/:buildingId', zoneManagementController);
router.get('/buildings', zoneManagementController);

// Zone routes
router.post('/zones', zoneManagementController);
router.put('/zones/:zoneId', zoneManagementController);
router.delete('/zones/:zoneId', zoneManagementController);
router.get('/zones', zoneManagementController);

module.exports = router;

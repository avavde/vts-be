// feedsRoutes.js
const express = require('express');
const feedsController = require("../controllers/feedManagementController")
const router = express.Router();

router.use('/feeds', feedsController);

module.exports = router;

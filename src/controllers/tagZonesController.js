const express = require('express');
const axios = require('axios');
const router = express.Router();

const SEWIO_API_URL = process.env.SEWIO_API_URL;
const SEWIO_API_KEY = process.env.SEWIO_API_KEY;

const sewioAxios = axios.create({
  baseURL: SEWIO_API_URL,
  headers: { 'Authorization': `Bearer ${SEWIO_API_KEY}` }
});

// Middleware for async error handling
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Middleware to add X-ApiKey header
sewioAxios.interceptors.request.use(config => {
  config.headers['X-ApiKey'] = SEWIO_API_KEY;
  return config;
});

// GET /tagzones/status Get Current Status of Tags' Encounters
router.get('/tagzones/status', asyncHandler(async (req, res) => {
  try {
    const response = await sewioAxios.get('/tagzones/status');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching tag zones status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// GET /tagzones/control Get Tag Zones' Specification
router.get('/tagzones/control', asyncHandler(async (req, res) => {
  try {
    const response = await sewioAxios.get('/tagzones/control');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching tag zones control:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// POST /tagzones/control Create New Tag Zone
router.post('/tagzones/control', asyncHandler(async (req, res) => {
  try {
    const requestBody = req.body;
    const response = await sewioAxios.post('/tagzones/control', requestBody);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating tag zone:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// PUT /tagzones/control/{id} Update Existing Tag Zone
router.put('/tagzones/control/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;
    const response = await sewioAxios.put(`/tagzones/control/${id}`, requestBody);
    res.json(response.data);
  } catch (error) {
    console.error('Error updating tag zone:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// DELETE /tagzones/control/{id} Delete Existing Tag Zone
router.delete('/tagzones/control/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await sewioAxios.delete(`/tagzones/control/${id}`);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting tag zone:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

module.exports = router;

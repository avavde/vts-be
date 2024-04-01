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

// GET /buildings/{id}/plans/{plan_name}/zones Get Zones
router.get('/buildings/:id/plans/:plan_name/zones', asyncHandler(async (req, res) => {
  try {
    const { id, plan_name } = req.params;
    const response = await sewioAxios.get(`/buildings/${id}/plans/${plan_name}/zones`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching zones:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// POST /buildings/{id}/plans/{plan_name}/zones Create Zone
router.post('/buildings/:id/plans/:plan_name/zones', asyncHandler(async (req, res) => {
  try {
    const { id, plan_name } = req.params;
    const requestBody = req.body;
    const response = await sewioAxios.post(`/buildings/${id}/plans/${plan_name}/zones`, requestBody);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating zone:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// PUT /zones/{zone_id} Update Zone
router.put('/zones/:zone_id', asyncHandler(async (req, res) => {
  try {
    const { zone_id } = req.params;
    const requestBody = req.body;
    const response = await sewioAxios.put(`/zones/${zone_id}`, requestBody);
    res.json(response.data);
  } catch (error) {
    console.error('Error updating zone:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// DELETE /zones/{zone_id} Delete Zone
router.delete('/zones/:zone_id', asyncHandler(async (req, res) => {
  try {
    const { zone_id } = req.params;
    await sewioAxios.delete(`/zones/${zone_id}`);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting zone:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

module.exports = router;

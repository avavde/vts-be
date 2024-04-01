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

// GET /buildings Get Buildings
router.get('/buildings', asyncHandler(async (req, res) => {
  try {
    const { user, tag } = req.query;
    const response = await sewioAxios.get('/buildings', {
      params: { user, tag }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching buildings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// POST /buildings Add Buildings
router.post('/buildings', asyncHandler(async (req, res) => {
  try {
    const requestBody = req.body;
    const response = await sewioAxios.post('/buildings', requestBody);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error adding building:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// GET /buildings/{id} Get Building
router.get('/buildings/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await sewioAxios.get(`/buildings/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching building:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// PUT /buildings/{id} Update Building
router.put('/buildings/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;
    const response = await sewioAxios.put(`/buildings/${id}`, requestBody);
    res.json(response.data);
  } catch (error) {
    console.error('Error updating building:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// DELETE /buildings/{id} Delete Building
router.delete('/buildings/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await sewioAxios.delete(`/buildings/${id}`);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting building:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// GET /buildings/{id}/plans Get All Plans for Given Building
router.get('/buildings/:id/plans', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const response = await sewioAxios.get(`/buildings/${id}/plans`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching plans for building:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// POST /buildings/{id}/plans Create New Plan for Building
router.post('/buildings/:id/plans', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;
    const response = await sewioAxios.post(`/buildings/${id}/plans`, requestBody);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating plan for building:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// PUT /buildings/{id}/plans/{plan_name} Update Plan
router.put('/buildings/:id/plans/:plan_name', asyncHandler(async (req, res) => {
  try {
    const { id, plan_name } = req.params;
    const requestBody = req.body;
    const response = await sewioAxios.put(`/buildings/${id}/plans/${plan_name}`, requestBody);
    res.json(response.data);
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// DELETE /buildings/{id}/plans/{plan_name} Delete Existing plan
router.delete('/buildings/:id/plans/:plan_name', asyncHandler(async (req, res) => {
  try {
    const { id, plan_name } = req.params;
    await sewioAxios.delete(`/buildings/${id}

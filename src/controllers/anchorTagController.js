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

// Middleware for async error handling in routes that use async/await
const asyncMiddleware = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Middleware to add X-ApiKey header
sewioAxios.interceptors.request.use(config => {
  config.headers['X-ApiKey'] = SEWIO_API_KEY;
  return config;
});

// GET /tags — Get Tags
router.get('/tags', asyncMiddleware(async (req, res) => {
  const { user, tag } = req.query;
  // Implementation...
}));

// POST /tags — Add tag
router.post('/tags', asyncMiddleware(async (req, res) => {
  const requestBody = req.body;
  // Implementation...
}));

// GET /tags/{ID or MAC} Get Tag
router.get('/tags/:id', asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const { start, end, limit, order } = req.query;
  // Implementation...
}));

// PUT /tags/{ID or MAC} Update Tag
router.put('/tags/:id', asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const requestBody = req.body;
  // Implementation...
}));

// DELETE /tags/{ID or MAC} Delete Tag
router.delete('/tags/:id', asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  // Implementation...
}));

// GET /tags/{ID or MAC}/datastreams/{datastreams_id} Get Datastream
router.get('/tags/:id/datastreams/:datastreams_id', asyncMiddleware(async (req, res) => {
  const { id, datastreams_id } = req.params;
  const { start, end } = req.query;
  // Implementation...
}));

// DELETE /tags/{ID or MAC}/datastreams/{datastreams_id} Delete Datastream
router.delete('/tags/:id/datastreams/:datastreams_id', asyncMiddleware(async (req, res) => {
  const { id, datastreams_id } = req.params;
  // Implementation...
}));

// GET /anchors
router.get('/anchors', asyncMiddleware(async (req, res) => {
  try {
    const config = {
      params: {
        user: req.query.user,
        tag: req.query.tag
      }
    };
    const response = await sewioAxios.get('/anchors', config);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching anchors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// POST /anchors
router.post('/anchors', asyncMiddleware(async (req, res) => {
  try {
    const requestBody = req.body;
    const response = await sewioAxios.post('/anchors', requestBody);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error adding anchor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

// PUT /anchors/:id
router.put('/anchors/:id', asyncMiddleware(async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;
    const response = await sewioAxios.put(`/anchors/${id}`, requestBody);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error editing anchor:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));

module.exports = router;

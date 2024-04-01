const express = require('express');
const axios = require('axios');
const router = express.Router();

// Environment variables for SEWIO API
const SEWIO_API_URL = process.env.SEWIO_API_URL;
const SEWIO_API_KEY = process.env.SEWIO_API_KEY;

// Axios instance for making requests to the SEWIO API
const sewioAxios = axios.create({
  baseURL: SEWIO_API_URL,
  headers: { 'X-ApiKey': SEWIO_API_KEY }
});

// Middleware to handle async operations
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// GET /feeds/{ID or MAC}/datastreams/{datastreams_id} to retrieve a specific data stream
router.get('/feeds/:id/datastreams/:datastreams_id', asyncMiddleware(async (req, res) => {
  const { id, datastreams_id } = req.params;
  const { start, end } = req.query;
  const response = await sewioAxios.get(`/feeds/${id}/datastreams/${datastreams_id}`, {
    params: { start, end }
  });
  res.json(response.data);
}));

// DELETE /feeds/{ID or MAC}/datastreams/{datastreams_id} to remove a data stream
router.delete('/feeds/:id/datastreams/:datastreams_id', asyncMiddleware(async (req, res) => {
  const { id, datastreams_id } = req.params;
  const response = await sewioAxios.delete(`/feeds/${id}/datastreams/${datastreams_id}`);
  res.json(response.data);
}));

module.exports = router;

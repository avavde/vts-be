const express = require('express');
const router = express.Router();
const axios = require('axios'); // Assuming axios for HTTP requests

const SEWIO_API_URL = 'process.env.SEWIO_API_URL';
const SEWIO_API_KEY = 'process.env.SEWIO_API_KEY';


// Middleware to handle async route handlers easily
const asyncHandler = fn => 
  (req, res, next) => 
    Promise.resolve(fn(req, res, next))
           .catch(next);

// Create Feed
router.post('/feeds', async (req, res) => {
  try {
    const config = {
      headers: { 'X-ApiKey': SEWIO_API_KEY }
    };
    // Запрос должен включать в себя все поля
    const requestBody = {
      id: req.body.id,
      alias: req.body.alias,
      title: req.body.title,
      description: req.body.description,
      feed: req.body.feed,
      type: req.body.type,
      updated: req.body.updated,
      created: req.body.created,
      creator: req.body.creator,
      version: req.body.version,
      website: req.body.website,
      tags: req.body.tags,
      datastreams: req.body.datastreams.map(ds => ({
        id: ds.id,
        current_value: ds.current_value,
        at: ds.at,
        symbol: ds.symbol,
        label: ds.label,
        datapoints: ds.datapoints.map(dp => ({
          value: dp.value,
          at: dp.at
        }))
      })),
      location: {
        disposition: req.body.location.disposition,
        ele: req.body.location.ele,
        name: req.body.location.name,
        lat: req.body.location.lat,
        exposure: req.body.location.exposure,
        lon: req.body.location.lon,
        domain: req.body.location.domain
      }
    };

    const response = await axios.post(`${SEWIO_API_URL}/feeds`, requestBody, config);
    res.json(response.data);
  } catch (error) {
    console.error('Error creating feed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get Feed
router.get('/feeds/:id', async (req, res) => {
  try {
    const { start, end, limit, order } = req.query;
    const config = {
      headers: { 'X-ApiKey': SEWIO_API_KEY },
      params: {
        start,
        end,
        limit,
        order
      }
    };
    const response = await axios.get(`${SEWIO_API_URL}/feeds/${req.params.id}`, config);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching feed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update feed
router.put('/feeds/:id', async (req, res) => {
  try {
    const config = {
      headers: { 'X-ApiKey': SEWIO_API_KEY },
    };
    const requestBody = {
      id: req.body.id,
      alias: req.body.alias,
      title: req.body.title,
      description: req.body.description,
      feed: req.body.feed,
      type: req.body.type,
      updated: req.body.updated,
      created: req.body.created,
      creator: req.body.creator,
      version: req.body.version,
      website: req.body.website,
      tags: req.body.tags,
      datastreams: req.body.datastreams.map(ds => ({
        id: ds.id,
        current_value: ds.current_value,
        at: ds.at,
        symbol: ds.symbol,
        label: ds.label,
        datapoints: ds.datapoints.map(dp => ({
          value: dp.value,
          at: dp.at
        }))
      })),
      location: {
        disposition: req.body.location.disposition,
        ele: req.body.location.ele,
        name: req.body.location.name,
        lat: req.body.location.lat,
        exposure: req.body.location.exposure,
        lon: req.body.location.lon,
        domain: req.body.location.domain
      }
    };

    const response = await axios.put(`${SEWIO_API_URL}/feeds/${req.params.id}`, requestBody, config);
    res.json(response.data);
  } catch (error) {
    console.error('Error updating feed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete Feed
router.delete('/feeds/:id', async (req, res) => {
  try {
    const config = {
      headers: { 'X-ApiKey': SEWIO_API_KEY }
    };
    const response = await axios.delete(`${SEWIO_API_URL}/feeds/${req.params.id}`, config);
    res.json(response.data);
  } catch (error) {
    console.error('Error deleting feed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// List Feeds
router.get('/feeds', async (req, res) => {
  try {
    // Добавление заголовка с API ключом
    const config = {
      headers: { 'X-ApiKey': SEWIO_API_KEY },
      params: {}
    };

    // Передача параметров user и tag, если они есть в запросе
    if (req.query.user) config.params.user = req.query.user;
    if (req.query.tag) config.params.tag = req.query.tag;

    const response = await axios.get(`${SEWIO_API_URL}/feeds`, config);
    // Возврат данных в ожидаемой структуре
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching feeds:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

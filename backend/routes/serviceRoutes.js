const express = require('express');
const { createService, getAllServices,updateService, deleteService } = require('../controllers/serviceController');

const router = express.Router();

// GET route to test home link
router.get('/', (req, res) => {
    res.send('Welcome to the Service Quotation System API test!');
  });
// POST route to create service
router.post('/services', createService);

// GET route to fetch all services
router.get('/services', getAllServices);
// Add these to your routes
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

module.exports = router;

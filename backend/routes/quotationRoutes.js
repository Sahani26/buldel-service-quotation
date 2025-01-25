// backend/routes/quotationRoutes.js

const express = require('express');
const router = express.Router();
const { addQuotation, getQuotations,
    deleteQuotation,updateQuotation } = require('../controllers/quotationController');

// POST: Add a new quotation
router.post('/', addQuotation);

// GET: Fetch all quotations
router.get('/', getQuotations);
// DELETE: Delete a quotation by ID
router.delete('/:id', deleteQuotation);

module.exports = router;

// backend/models/Quotation.js

const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  serviceName: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Quotation', QuotationSchema);

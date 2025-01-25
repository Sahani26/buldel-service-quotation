// backend/controllers/quotationController.js

const Quotation = require('../models/Quotation');

// POST: Save a new quotation
const addQuotation = async (req, res) => {
  try {
    const { serviceId, serviceName, quantity, total } = req.body;

    // Create and save the quotation in the database
    const quotation = new Quotation({ serviceId, serviceName, quantity, total });
    await quotation.save();

    res.status(201).json({ message: 'Quotation saved successfully', quotation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quotation' });
  }
};

// GET: Fetch all quotations
const getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
};
// DELETE: Delete a quotation by ID
const deleteQuotation = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Quotation.findByIdAndDelete(id);
      if (result) {
        res.status(200).json({ message: 'Quotation deleted successfully' });
      } else {
        res.status(404).json({ error: 'Quotation not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete quotation' });
    }
  };

  //updated

const updateQuotation = async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity, total } = req.body;
  
      const updatedQuotation = await Quotation.findByIdAndUpdate(id, { quantity, total }, { new: true });
  
      if (updatedQuotation) {
        res.status(200).json(updatedQuotation);
      } else {
        res.status(404).json({ error: 'Quotation not found' });
      }
    } catch (err) {
      console.error('Error updating quotation:', err);
      res.status(500).json({ error: 'Failed to update quotation' });
    }
  };
  

module.exports = {
  addQuotation,
  getQuotations,
  deleteQuotation,updateQuotation
};

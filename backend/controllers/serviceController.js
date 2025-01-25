const Service = require('../models/Service');

// Create a new service
const createService = async (req, res) => {
  const { name, amount } = req.body;
  console.log('Creating service:', { name, amount }); // Log input data

  try {
    const service = new Service({ name, amount });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};


// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
};
// Update a service
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, amount } = req.body;

  try {
    const service = await Service.findByIdAndUpdate(id, { name, amount }, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};



module.exports = { createService, getAllServices ,deleteService,updateService};

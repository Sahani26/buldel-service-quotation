const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const serviceRoutes = require('./routes/serviceRoutes');
const quotationRoutes = require('./routes/quotationRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Routes
app.use('/api', serviceRoutes);
 
app.use('/api/quotations', quotationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

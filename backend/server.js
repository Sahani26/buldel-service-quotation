const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const serviceRoutes = require('./routes/serviceRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: `${process.env.FRONT}`
// }));
 
app.use(cors());
// Connect to DB
// connectDB();
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sunilsahani484:pwro6bfetM15eKf9@cluster0.x2iz2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit if MongoDB connection fails
  }
};
 connectDB();
// Routes
app.use('/', serviceRoutes);
 
app.use('/quotations', quotationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

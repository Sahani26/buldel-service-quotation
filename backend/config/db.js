const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    console.log("Connecting to MongoDB...");

    await mongoose.connect(
      "mongodb+srv://sunilsahani484_db_user:Vc2HaWaXM0wOF91A@cluster0.khtfqfl.mongodb.net/buldel-service-bill?retryWrites=true&w=majority"
    );

    console.log("MongoDB connected successfully");

  } catch (error) {

    console.error("Error connecting to MongoDB:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
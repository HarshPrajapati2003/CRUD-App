const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!!");
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

module.exports = connectDB;
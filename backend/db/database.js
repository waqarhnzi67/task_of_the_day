require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () =>{
   try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
    
   } catch (error) {
    console.log("Error to connect mongodb", error);
    process.exit(1);
   }
}

module.exports = connectDB;
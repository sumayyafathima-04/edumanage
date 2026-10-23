import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
    });

    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB] Database name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    console.warn(`
----------------------------------------------------------------------
  NOTE FOR LOCAL OR ATLAS MONGODB SETUP:
  1. If using local MongoDB: Ensure the MongoDB service/daemon is running:
     Run 'mongod' or start MongoDB in Windows Services.
  2. If using MongoDB Atlas: Update MONGODB_URI in server/.env with:
     mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/student_management_db?retryWrites=true&w=majority
----------------------------------------------------------------------
    `);
  }
};

export default connectDB;

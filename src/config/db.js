const { MongoClient } = require("mongodb");

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log("MongoDB connected successfully");
    return client.db(process.env.DB_NAME);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

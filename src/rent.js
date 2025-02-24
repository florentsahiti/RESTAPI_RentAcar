const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./auth/auth.route");
const carRoutes = require("./cars/car.route");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

let db;

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/auth", authRoutes);
app.use("/cars", carRoutes);

const startServer = async () => {
  try {
    db = await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();

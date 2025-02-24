const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};

const register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User(fullname, username, email, hashedPassword);
    const existingUser = await req.db
      .collection("users")
      .findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    await req.db.collection("users").insertOne(user.toDocument());
    const { password: _, ...userWithoutPassword } = user.toDocument();
    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await req.db.collection("users").findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

const myProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await req.db.collection("users").findOne({
      _id: new ObjectId(userId),
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Profile fetched successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get profile" });
  }
};

module.exports = {
  register,
  login,
  myProfile,
  authenticateToken,
};

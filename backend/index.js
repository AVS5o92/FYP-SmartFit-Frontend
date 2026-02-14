const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Atlas or local fallback)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wardrobe-wizardry")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Wardrobe Wizardry Backend API" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Static for uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Routes
app.use("/api", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/packages", packageRoutes);


// Root test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running with all APIs on port 5000");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡ Server running on port ${PORT}`));

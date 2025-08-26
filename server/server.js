import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categoryRoutes.js";



dotenv.config();
const app = express();
app.use("/uploads", express.static("uploads")); 


app.use(cors());

app.use(express.json());

// routes
app.use("/api", authRoutes);
//register api
app.use("/api/categories", categoryRoutes);


// connect db
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log("Server running on port 5000"));

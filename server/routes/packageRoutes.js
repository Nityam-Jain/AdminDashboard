import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

const router = express.Router();

const uploadDir = "uploads/package";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // keep extension
  },
});
const upload = multer({ storage });

// POST new package
router.post("/create", upload.single("image"), createPackage);

// GET all packages
router.get("/", getPackages);

// UPDATE package by ID
router.put("/:id", upload.single("image"), updatePackage);

// DELETE package by ID
router.delete("/:id", deletePackage);

export default router;

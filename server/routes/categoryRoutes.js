import express from "express";
import multer from "multer";
import Category from "../models/category.js";

const router = express.Router();

// multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/categories"); // folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Add Category
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { categoryName } = req.body;
     if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }
    const image = req.file ? req.file.path : null;

    const category = new Category({
      categoryName,
      image,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Categories
// router.get("/", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

export default router;

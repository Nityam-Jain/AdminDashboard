// models/Subcategory.js
import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  name: { type: String, required: true },
  image: { type: String },
});

export default mongoose.model("Subcategory", subcategorySchema);

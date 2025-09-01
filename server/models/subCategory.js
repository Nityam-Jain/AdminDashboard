import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category",
    required: true,
  },
  subCategoryName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Category", subCategorySchema);

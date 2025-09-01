import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  image: { type: String,required: true }, 
  price: { type: Number, required: true }, 
  duration: { type: String, required: true },
  rating: { type: Number, default: 0 }, 
  features: [{ type: String }], 
});

const Package = mongoose.model("Package", packageSchema);

export default Package;

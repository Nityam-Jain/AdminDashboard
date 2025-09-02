import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  city: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  // date: { type: Date, required: true },
  durationDays: {
    type: Number,
    required: true,
    min: 1,
    max: 15,
  },
  durationNights: {
    type: Number,
    required: true,
    min: 0,
    max: 15,
  },

  features: [{ type: String }],
  persons: { type: Number, required: true },
  included: {
    type: String, 
  },
  excluded: {
    type: String, 
  },

});

const Package = mongoose.model("Package", packageSchema);

export default Package;

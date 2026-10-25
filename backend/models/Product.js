const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  cat: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  sold: { type: Number, default: 0, min: 0 },
  ico: { type: String, default: "📦" },
  units: { type: Number, default: 0, min: 0 },
  rev: { type: Number, default: 0, min: 0 },
  margin: { type: Number, default: 0, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);

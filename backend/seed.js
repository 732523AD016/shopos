require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  { name: "Wireless Headphones", cat: "Electronics", price: 2499, stock: 45, rating: 4.5, sold: 120, ico: "🎧" },
  { name: "Smart Watch", cat: "Electronics", price: 3999, stock: 30, rating: 4.3, sold: 85, ico: "⌚" },
  { name: "Running Shoes", cat: "Fashion", price: 1999, stock: 60, rating: 4.4, sold: 95, ico: "👟" },
  { name: "Backpack", cat: "Fashion", price: 1299, stock: 25, rating: 4.2, sold: 55, ico: "🎒" },
  { name: "Coffee Maker", cat: "Home", price: 3499, stock: 18, rating: 4.6, sold: 42, ico: "☕" },
  { name: "Desk Lamp", cat: "Home", price: 899, stock: 40, rating: 4.1, sold: 68, ico: "💡" }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    if (await Product.countDocuments() === 0) {
      await Product.insertMany(products);
      console.log("Sample products added successfully!");
    } else {
      console.log("Products already exist. No changes made.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();
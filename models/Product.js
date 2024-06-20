const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Date,
});

productSchema.index({ title: "text", description: "text" });
productSchema.index({ price: 1 });

module.exports = mongoose.model("Product", productSchema);

// models/Product.js
const mongoose = require('mongoose');
// Product Attribute Schema
const ProductAttributeSchema = new mongoose.Schema({
    product_id: Number,
    category: String,
    attributes: mongoose.Schema.Types.Mixed,
  }, { timestamps: true });

module.exports = mongoose.model('Product', ProductAttributeSchema);

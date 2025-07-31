const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
  tags: [String]
});

module.exports = mongoose.model('Product', productSchema);
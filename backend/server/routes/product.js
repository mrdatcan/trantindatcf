const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const data = await Product.find();
    res.json(data);
  } catch {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
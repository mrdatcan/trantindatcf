// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// TÊN MODEL phải đúng 'User' (viết hoa)
module.exports = mongoose.model("User", userSchema);
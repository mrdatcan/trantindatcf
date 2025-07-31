const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

const app = express();

// ✅ CORS chỉ cho phép từ frontend Vercel
app.use(cors({
  origin: 'https://trantindatcf.vercel.app', // Thay bằng domain FE thực tế của bạn
  credentials: true
}));

app.use(express.json());

// ✅ Đăng ký route
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ✅ Không nên dùng express.static nếu bạn đã deploy FE ở nơi khác
// Nếu dùng để test local thì vẫn giữ:
// app.use(express.static(path.join(__dirname, "../../fe")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

console.log("🌍 MONGO_URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
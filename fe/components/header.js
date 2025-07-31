// components/header.js

function renderUserSection() {
  const userSection = document.getElementById("user-section");
  const name = localStorage.getItem("currentUser"); // Lưu tên hoặc email người dùng

  if (userSection) {
    if (name) {
      userSection.innerHTML = `
        <span>👋 Xin chào, ${name}</span>
        <button onclick="logout()">Đăng xuất</button>
      `;
    } else {
      userSection.innerHTML = `
        <a href="login.html"><i class="fas fa-user"></i> Đăng nhập</a>
      `;
    }
  }
}

function logout() {
  localStorage.removeItem("currentUser"); // Xoá thông tin đăng nhập
  localStorage.removeItem("cart");        // Xoá giỏ hàng nếu muốn
  location.href = "index.html";           // Quay về trang chủ
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const el = document.querySelector(".cart-count");
  if (el) el.textContent = total;
}

// Gọi tự động khi file được import vào header
document.addEventListener("DOMContentLoaded", () => {
  renderUserSection();
  updateCartCount();
});
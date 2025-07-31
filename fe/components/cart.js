// components/cart.js

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const el = document.querySelector(".cart-count");
  if (el) el.textContent = total;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Nếu có thay đổi localStorage từ addToCart ở các trang khác
  window.addEventListener("storage", updateCartCount);
});

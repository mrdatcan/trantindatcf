// js/cart.js
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const totalPriceEl = document.querySelector(".total-price");
  const cartCountEls = document.querySelectorAll(".cart-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Giỏ hàng trống</p>";
      updateCartCount();
      totalPriceEl.textContent = "0₫";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-details">
          <h4>${item.name}</h4>
          <p>Giá: ${formatPrice(item.price)}</p>
          <p>Số lượng: 
            <button class="decrease" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
          </p>
          <button class="remove" data-index="${index}">Xóa</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);
      total += item.price * item.quantity;
    });

    totalPriceEl.textContent = formatPrice(total);
    updateCartCount();
  }

  function updateCartCount() {
    cartCountEls.forEach(el => el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0));
  }

  cartItemsContainer.addEventListener("click", (e) => {
    const index = parseInt(e.target.dataset.index);
    if (e.target.classList.contains("remove")) {
      cart.splice(index, 1);
    } else if (e.target.classList.contains("increase")) {
      cart[index].quantity++;
    } else if (e.target.classList.contains("decrease")) {
      cart[index].quantity = Math.max(1, cart[index].quantity - 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

  function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "₫";
  }

  renderCart();
});

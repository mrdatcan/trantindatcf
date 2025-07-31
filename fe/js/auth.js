// auth.js — Quản lý đăng nhập / đăng ký / hiển thị người dùng

// Mở popup
function openModal(id) {
  document.getElementById(id)?.classList.remove("hidden");
}

// Đóng popup
function closeModal(id) {
  document.getElementById(id)?.classList.add("hidden");
}

// Chuyển popup
function switchModal(current, target) {
  closeModal(current);
  openModal(target);
}

// Đăng ký
function handleRegister() {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  if (!email || !password) return alert("Vui lòng điền đầy đủ");
  if (localStorage.getItem(email)) return alert("Email đã tồn tại");

  const user = { email, username: email.split("@")[0], password };
  localStorage.setItem(email, JSON.stringify(user));
  alert("Đăng ký thành công!");
  switchModal('registerModal', 'loginModal');
}

// Đăng nhập
function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Đăng nhập thành công!");
    closeModal("loginModal");
    renderUserUI();
  } else {
    alert("Sai email hoặc mật khẩu");
  }
}

// Đăng xuất
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// Hiển thị "Xin chào, tên người dùng" hoặc "Đăng nhập / Đăng ký"
function renderUserUI() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const userSection = document.getElementById("user-section");
  const userStatus = document.getElementById("user-status");

  const html = user
    ? `👋 Xin chào, <strong>${user.username}</strong> <a href="#" onclick="logout()">[Đăng xuất]</a>`
    : `<a href="#" onclick="openModal('loginModal')">Đăng nhập</a> | <a href="#" onclick="openModal('registerModal')">Đăng ký</a>`;

  if (userSection) userSection.innerHTML = html;
  if (userStatus) userStatus.innerHTML = html;
}

// Gọi sau khi DOM load xong
document.addEventListener("DOMContentLoaded", renderUserUI);
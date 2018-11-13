const cartLink = document.getElementById('cart-link');
const dashboardLink = document.getElementById('dashboard-link');
const myOrdersLink = document.getElementById('my-orders-link');
const userInfoLink = document.getElementById('user-info-link');
const authLinks = document.getElementById('auth-links');

const cart = JSON.parse(localStorage.getItem('cart'));
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// replace cart count on DOM
cartLink.innerHTML = `<a href="cart.html">
    <i class="fa fa-shopping-cart"></i>
    Cart <span class="cart-count">${cart ? cart.length : 0}</span>
  </a>`;

function headerInfo() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo) {
    authLinks.style.display = 'none';
    userInfoLink.innerHTML = `<i class="fa fa-user"></i> ${userInfo.username}</br>
    <button onclick="logout()" id="logout-link">logout</button>`;

    if (userInfo.role !== 'admin') {
      dashboardLink.style.display = 'none';
    }
  } else {
    authLinks.style.display = 'block';
    myOrdersLink.style.display = 'none';
    userInfoLink.style.display = 'none';
    dashboardLink.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('userInfo');
  headerInfo();
}

headerInfo();

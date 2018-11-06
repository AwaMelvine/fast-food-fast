const cartLink = document.getElementById('cart-link');

const cart = JSON.parse(localStorage.getItem('cart'));

// replace cart count on DOM
cartLink.innerHTML = `<a href="cart.html">
    <i class="fa fa-shopping-cart"></i>
    Cart <span class="cart-count">${cart ? cart.length : 0}</span>
  </a>`;

const cartTableBody = document.getElementById('cart-table-body');
const confirmOrderBtn = document.getElementById('confirm-order-btn');
const totalPriceDisplay = document.getElementById('total-price-display');

let total_price = 0;

function displayCart() {
  let itemDisplay = '';
  total_price = 0;
  const cart = JSON.parse(localStorage.getItem('cart'));
  cart.forEach((element, index) => {
    total_price += element.item.unit_price * element.quantity;
    itemDisplay = `${itemDisplay}<tr>
        <td>${index + 1}</td>
        <td>${element.item.name}</td>
        <td><img src="${element.item.image}" alt=""></td>
        <td>
          <form action="order_history.html" class="form">
            <select onChange='return computePrice(${element.item.id}, this)' name="Quantity" id="quantity" class="input-field dropdown">
              <option value="1" ${element.quantity === '1' ? 'selected' : ''}>1</option>
              <option value="2" ${element.quantity === '2' ? 'selected' : ''}>2</option>
              <option value="3" ${element.quantity === '3' ? 'selected' : ''}>3</option>
              <option value="4" ${element.quantity === '4' ? 'selected' : ''}>4</option>
              <option value="5" ${element.quantity === '5' ? 'selected' : ''}>5</option>
              <option value="6" ${element.quantity === '6' ? 'selected' : ''}>6</option>
            </select>
          </form>
        </td>
        <td>${element.item.unit_price * element.quantity}</td>
        <td>
          <button onClick="return removeFromCart(${element.item.id}, this)" class="btn btn-red btn-sm">
            <i class="fa fa-trash"></i></button>
        </td>
      </tr>`;
  });

  totalPriceDisplay.innerHTML = `<p>Total Price: NGN ${total_price}</p>`;

  cartTableBody.innerHTML = itemDisplay;

  const cartLink = document.getElementById('cart-link');


  // replace cart count on DOM
  cartLink.innerHTML = `<a href="cart.html">
    <i class="fa fa-shopping-cart"></i>
    Cart <span class="cart-count">${cart ? cart.length : 0}</span>
  </a>`;
}

function computePrice(itemId, e) {
  const updatedCart = cart.map((cartItem) => {
    if (itemId === cartItem.item.id) {
      cartItem.quantity = e.value;
      return cartItem;
    }
    return cartItem;
  });

  localStorage.setItem('cart', JSON.stringify(updatedCart));
  displayCart();
}

function removeFromCart(itemId, event) {
  const element = event.parentElement.parentElement;
  event.parentElement.parentElement.parentElement.removeChild(element);
  const cart = JSON.parse(localStorage.getItem('cart'));
  const newCart = cart.filter(cartItem => cartItem.item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(newCart));
  displayCart();
}

displayCart();
confirmOrderBtn.addEventListener('click', (event) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const data = {
    cart,
    total_price,
    status: 'NEW',
  };

  const token = JSON.parse(localStorage.getItem('userInfo')).token;

  confirmOrderBtn.classList.add('is-loading');
  confirmOrderBtn.disabled = true;

  fetch('https://fast-food-fast-service.herokuapp.com/api/v1/orders', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    }),
  }).then(res => res.json())
    .then((response) => {
      confirmOrderBtn.classList.remove('is-loading');
      confirmOrderBtn.disabled = false;
      const message = {
        text: 'Order placed successfully',
        type: 'success',
      };

      localStorage.setItem('message', JSON.stringify(message));
      localStorage.removeItem('cart');
      window.location.href = 'order_history.html';
    })
    .catch(error => console.error('Error:', error));
});

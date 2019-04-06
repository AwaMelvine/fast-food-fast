const detailsContainer = document.getElementById('item-details-container');

const item_id = window.location.search.split('=')[1];

function fetchItem() {
  fetch(`${rootUrl}/api/v1/menu/${item_id}`, {
    mode: 'cors',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json())
    .then((response) => {
      const item = response.data;
      const stringItem = JSON.stringify(item);

      const itemDisplay = `<h3 class="center-text">${item.name}</h3>
      <div class="item clear">
        <div class="item-images">
          <div class="image"><img src="${rootUrl}/images/${item.image}" width="100%" /></div>
        </div>
        <div class="item-details">
          <h3>Details</h3>
          <p>${item.description}</p>
          <br>
          <button type="button" onclick='addToCart(${stringItem})' class="btn btn-sm btn-orange"><i class="fa fa-cart-plus"></i>Add to cart</button>
        </div>
      </div>`;

      detailsContainer.innerHTML = itemDisplay;
    })
    .catch(error => console.error('Error:', error));
}

function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const previousItem = cart.find(cItem => cItem.item.id === item.id);

  const newCart = [];

  if (!previousItem) {
    const newItem = {
      item,
      quantity: 1,
    };
    cart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    const updatedCart = JSON.parse(localStorage.getItem('cart'));

    // replace cart count on DOM
    cartLink.innerHTML = `<a href="cart.html">
      <i class="fa fa-shopping-cart"></i>
      Cart <span class="cart-count">${updatedCart.length}</span>
    </a>`;
  }
}

fetchItem();

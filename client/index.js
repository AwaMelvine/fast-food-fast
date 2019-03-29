const itemsContainer = document.getElementById('items-container');
const searchField = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const itemsTitle = document.getElementById('items-title');
const formInfo = document.getElementById('form-info');
const rootUrl = 'http://localhost:5000';


function displayFormErrors(errors) {
  console.log(errors);
  let formErrors = '<div class="form-errors">';
  Object.keys(errors).forEach((field) => {
    formErrors = `${formErrors}<li>${errors[field]}</li>`;
  });
  formErrors = `${formErrors}</div>`;
  formInfo.innerHTML = formErrors; // eslint-disable-line
}


function fetchItems(searchTerm = '') {
  formInfo.innerHTML = '';
  if (searchTerm !== '') {
    console.log("Searching...");
    fetch(`${rootUrl}/api/v1/menu/search`, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ searchTerm }),
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
      .then((response) => {
        let itemsWrapper = '<div class="items-wrapper">';
        if (response.length === 0) {
          itemsContainer.innerHTML = '<div class="center-text"><p>No items were found!</p></div>';
          return;
        }

        if (response.errors) {
          displayFormErrors(response.errors);
          return;
        }
        response.forEach((item, index) => {
          const tempIndex = index + 1;
          const stringItem = JSON.stringify(item);
          itemsWrapper = `${itemsWrapper}<div class="food-item">
        <img src="${rootUrl}/images/${item.image}" alt="">
        <h4>${item.name}</h4>
        <p>${item.description.substring(0, 50)}</p>
        <div class="action">
          <span class="price">NGN ${item.unit_price}</span>
          <button onclick='addToCart(${stringItem})' class="btn btn-sm btn-orange"><i class="fa fa-cart-plus"></i>Add to cart</button>
          <a href="item_details.html?id=${item.id}" class="btn btn-sm btn-dark-blue">Details</a>
        </div>
      </div>`;

          if (tempIndex % 3 === 0) {
            itemsWrapper = `${itemsWrapper}</div><br><div class="items-wrapper">`;
          }
        });
        itemsWrapper = `${itemsWrapper}</div>`;
        itemsContainer.innerHTML = itemsWrapper;
        itemsTitle.innerHTML = `You searched for "${searchTerm}"`;
      })
      .catch(error => console.error('Error:', error));
  } else {
    fetch(`${rootUrl}/api/v1/menu`, {
      mode: 'cors',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json())
      .then((response) => {
        console.log(response);
        let itemsWrapper = '<div class="items-wrapper">';
        response.data.slice(0, 6).forEach((item, index) => {
          const tempIndex = index + 1;
          const stringItem = JSON.stringify(item);
          itemsWrapper = `${itemsWrapper}<div class="food-item">
        <img src="${rootUrl}/images/${item.image}" alt="">
        <h4>${item.name}</h4>
        <p>${item.description.substring(0, 50)}</p>
        <div class="action">
          <span class="price">NGN ${item.unit_price}</span>
          <button onclick='addToCart(${stringItem})' class="btn btn-sm btn-orange"><i class="fa fa-cart-plus"></i>Add to cart</button>
          <a href="item_details.html?id=${item.id}" class="btn btn-sm btn-dark-blue">Details</a>
        </div>
      </div>`;

          if (tempIndex % 3 === 0) {
            itemsWrapper = `${itemsWrapper}</div><br><div class="items-wrapper">`;
          }
        });
        itemsWrapper = `${itemsWrapper}</div>`;
        itemsContainer.innerHTML = itemsWrapper;
      })
      .catch(error => console.error('Error:', error));
  }
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


searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const searchTerm = searchField.value;

  fetchItems(searchTerm);
});


fetchItems();

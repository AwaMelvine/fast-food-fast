const itemsContainer = document.getElementById('items-container');

function fetchItems() {
  fetch('https://fast-food-fast-service.herokuapp.com/api/v1/menu', {
    mode: 'cors',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json())
    .then((response) => {
      let itemsWrapper = '<div class="items-wrapper">';
      response.data.forEach((item, index) => {
        const tempIndex = index + 1;
        const stringItem = JSON.stringify(item);
        itemsWrapper = `${itemsWrapper}<div class="food-item">
        <img src="${item.image}" alt="">
        <h4>${item.name}</h4>
        <p>${item.description.substring(0, 60)}</p>
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

fetchItems();

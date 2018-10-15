const detailsContainer = document.getElementById('item-details-container');

const item_id = window.location.search.split('=')[1];

function fetchItems() {
  fetch(`https://fast-food-fast-service.herokuapp.com/api/v1/menu/${item_id}`, {
    mode: 'cors',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json())
    .then((response) => {
      const item = response.data;

      const itemDisplay = `<h3 class="center-text">${item.name}</h3>
      <div class="item">
        <div class="item-images">
          <h3 class="center-text">Images</h3>
          <div class="image"></div>
          <div class="image"></div>
        </div>
        <div class="item-details">
          <h3>Details</h3>
          <p>${item.description}</p>
          <br>
          <a href="item_details.html" class="btn btn-sm btn-orange"><i class="fa fa-cart-plus"></i>Add to cart</a>
        </div>
      </div>`;

      detailsContainer.innerHTML = itemDisplay;
    })
    .catch(error => console.error('Error:', error));
}

fetchItems();

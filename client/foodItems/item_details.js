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

      const itemDisplay = `<h3 class="center-text">${item.name}</h3>
      <div class="item clear">
        <div class="item-images">
          <div class="image"><img src="${rootUrl}/images/${item.image}" width="100%" /></div>
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

fetchItem();

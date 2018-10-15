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
      // TODO: list menu items on page
      console.log(response.data);
    })
    .catch(error => console.error('Error:', error));
}

fetchItems();

const allOrdersContainer = document.getElementById('all-orders-container');
const messageDiv = document.getElementById('message-div');


function fetchAllOrders() {
  const userInfo = localStorage.getItem('userInfo');
  const token = JSON.parse(userInfo).token;
  let orderDisplay = '';

  fetch('https://fast-food-fast-service.herokuapp.com/api/v1/orders', {
    mode: 'cors',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    }),
  }).then(res => res.json())
    .then((response) => {
      response.data.forEach((item, index) => {
        orderDisplay = `${orderDisplay}<tr>
        <td>John Doe <small>(johndoe@testmail.com)</small></td>
        <td>1</td>
        <td>Vegetable Salad</td>
        <td>2</td>
        <td>2000</td>
        <td>3 minutes ago</td>
        <td class="processing">PROCESSING</td>
        <td>
          <a href="#" class="btn btn-orange btn-sm">
            <i class="fa fa-check"></i> Accept</a>
        </td>
        <td>
          <a href="#" class="btn btn-red btn-sm">
            <i class="fa fa-close"></i> Decline</a>
        </td>
        <td>
          <a href="#" class="btn btn-green btn-sm">
            <i class="fa fa-check-circle"></i> Mark as completed</a>
        </td>
      </tr>
        `;
      });
      allOrdersContainer.innerHTML = orderDisplay;
    })
    .catch(error => console.error('Error:', error));
}

fetchAllOrders();

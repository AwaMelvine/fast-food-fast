const orderHistoryContainer = document.getElementById('order-history-container');


function fetchUserOrders() {
  const userInfo = localStorage.getItem('userInfo');
  const token = JSON.parse(userInfo).token;
  let orderDisplay = '';

  fetch('https://fast-food-fast-service.herokuapp.com/api/v1/users/1/orders', {
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
          <td>${item.order_id}</td>
          <td>${item.name}</td>
          <td><img src="${item.image}" alt=""></td>
          <td>${item.quantity}</td>
          <td>${item.unit_price}</td>
          <td>${moment(item.created_at).format('lll')}</td>
          <td class="processing">${item.status}</td>
          <td>
            <a href="#" class="btn btn-orange btn-sm">
              <i class="fa fa-close"></i> Cancel Order</a>
          </td>
        </tr>`;
      });
      orderHistoryContainer.innerHTML = orderDisplay;
    })
    .catch(error => console.error('Error:', error));
}

fetchUserOrders();

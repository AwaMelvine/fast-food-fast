const allOrdersContainer = document.getElementById('all-orders-container');
const ordersFilter = document.getElementById('filter');
const messageDiv = document.getElementById('message-div');

function displayMessage() {
  const message = JSON.parse(localStorage.getItem('message'));

  if (message) {
    messageDiv.innerHTML = `<div class="msg ${message.type}">${message.text}</div>`;
    localStorage.removeItem('message');
  }
}

function fetchAllOrders() {
  const userInfo = localStorage.getItem('userInfo');
  const token = JSON.parse(userInfo).token;
  let ordersDisplay = '';

  fetch(`${rootUrl}/api/v1/orders`, {
    mode: 'cors',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    }),
  }).then(res => res.json())
    .then((response) => {
      response.data.forEach((item, index) => {
        ordersDisplay = `${ordersDisplay}<tr class="order-row row-${item.status.toLowerCase()}">
        <td>${item.username} <small>(${item.email})</small></td>
        <td>${item.order_id}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.unit_price}</td>
        <td>${moment(item.created_at).format('lll')}</td>
        <td class="${item.status.toLowerCase()}">${item.status}</td>
        <td>
          <button onClick="changeStatus('PROCESSING', ${item.id})" 
            class="btn btn-orange btn-sm ${item.status === 'PROCESSING' ? 'disabled' : ''}"
            ${item.status === 'PROCESSING' ? 'disabled' : ''}
            >
            <i class="fa fa-check"></i> Accept</button>
        </td>
        <td>
          <button onClick="changeStatus('DECLINED', ${item.id})" 
            class="btn btn-red btn-sm ${item.status === 'DECLINED' ? 'disabled' : ''}"
            ${item.status === 'DECLINED' ? 'disabled' : ''}
            >
            <i class="fa fa-close"></i> Decline</button>
        </td>
        <td>
          <button onClick="changeStatus('COMPLETED', ${item.id})" 
            class="btn btn-green btn-sm ${item.status === 'COMPLETED' ? 'disabled' : ''}"
            ${item.status === 'COMPLETED' ? 'disabled' : ''}
            >
            <i class="fa fa-check-circle"></i> Mark as completed</button>
        </td>
      </tr>`;
      });
      if (response.data.length === 0) {
        ordersDisplay = '<tr><td colspan="8" class="center-text">No Orders Have Been Placed Yet!</td></tr>';
      }
      allOrdersContainer.innerHTML = ordersDisplay;
    })
    .catch(error => console.error('Error:', error));
}


function changeStatus(newStatus, orderId) {
  const userInfo = localStorage.getItem('userInfo');
  const token = JSON.parse(userInfo).token;

  fetch(`${rootUrl}/api/v1/orders/${orderId}`, {
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify({ status: newStatus }),
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    }),
  }).then(res => res.json())
    .then((response) => {
      fetchAllOrders();
      const message = {
        text: 'Order status updated',
        type: 'success',
      };

      localStorage.setItem('message', JSON.stringify(message));

      displayMessage();
    })
    .catch(error => console.error('Error:', error));
}

ordersFilter.addEventListener('change', () => {
  const status = ordersFilter.value.toLowerCase();
  const orderRows = document.getElementsByClassName('order-row');
  let counter = 0;
  const len = orderRows.length;

  while (counter < len) {
    if (!orderRows[counter].classList.contains(`row-${status}`)) {
      orderRows[counter].classList.toggle('hide');
    }
    counter += 1;
  }
});

fetchAllOrders();

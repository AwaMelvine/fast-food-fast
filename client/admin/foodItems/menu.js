const itemsTableBody = document.getElementById('items-table-body');
const messageDiv = document.getElementById('message-div');

function displayMessage() {
  const message = JSON.parse(localStorage.getItem('message'));
  console.log(message);
  if (message) {
    messageDiv.innerHTML = `<div class="msg ${message.type}">${message.text}</div>`;
    localStorage.removeItem('message');
  }
}

function fetchItems() {
  fetch('http://localhost:5000/api/v1/menu', {
    mode: 'cors',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json())
    .then((response) => {
      let itemsRows = '';

      if (response.data.length === 0) {
        itemsTableBody.innerHTML = `<tr>
            <td colspan="7" class="center-text">No items yet!</td>
          </tr>`;
        return;
      }

      response.data.forEach((item, index) => {
        const tempIndex = index + 1;
        itemsRows = `${itemsRows}<tr>
            <td>${tempIndex}</td>
            <td>${item.name}</td>
            <td>
              <img src="${item.image}" alt="">
            </td>
            <td>${item.description.substring(0, 60)}</td>
            <td>${item.unit_price}</td>
            <td>${item.quantity}</td>
            <td>
              <a href="edit_food_item.html?id=${item.id}" class="btn btn-green btn-sm">
                <i class="fa fa-pencil"></i> Edit</a>
            </td>
            <td>
              <button type="button" id="delete-item-btn" onClick="deleteItem(${item.id})" data-id="${item.id}" class="btn btn-red btn-sm">
                <i class="fa fa-trash"></i> Delete</button>
            </td>
          </tr>`;
      });
      itemsTableBody.innerHTML = itemsRows;
    })
    .catch(error => console.error('Error:', error));
}


function deleteItem(id) {
  const userInfo = localStorage.getItem('userInfo');
  const token = JSON.parse(userInfo).token;

  fetch(`http://localhost:5000/api/v1/menu/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    }),
  })
    .then(() => {
      fetchItems();
      const message = {
        text: 'Food item Deleted',
        type: 'success',
      };

      localStorage.setItem('message', JSON.stringify(message));
      displayMessage();
    })
    .catch(error => console.error('Error:', error));
}

displayMessage();
fetchItems();

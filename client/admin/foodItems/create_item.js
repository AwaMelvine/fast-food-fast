const itemName = document.getElementById('name');
const image = document.getElementById('image');
const description = document.getElementById('description');
const unitPrice = document.getElementById('unit_price');
const quantity = document.getElementById('quantity');
const submitBtn = document.getElementById('submitBtn');
const formInfo = document.getElementById('form-info');


function validateItem(item) {
  const errors = {};

  if (!item.name || item.name === '') {
    errors.name = 'Item name is required';
  }
  if (!item.image || item.image === '') {
    errors.image = 'Image is required';
  }
  if (!item.description || item.description.length < 100) {
    errors.description = 'Description must be at least 100 characters long';
  }
  if (!item.unit_price || item.unit_price === '') {
    errors.unit_price = 'Unit Price is required';
  }
  if (!item.quantity || item.quantity === '') {
    errors.quantity = 'Quantity is required';
  }

  return errors;
}

function displayFormErrors(errors) {
  let formErrors = '<div class="form-errors">';
  Object.keys(errors).forEach((field) => {
    formErrors = `${formErrors}<li>${errors[field]}</li>`;
  });
  formErrors = `${formErrors}</div>`;
  formInfo.innerHTML = formErrors; // eslint-disable-line
}

function createItem(e) {
  e.preventDefault();
  formInfo.innerHTML = '';

  const item = {
    name: itemName.value,
    image: image.value || 'http://via.placeholder.com/170x170',
    description: description.value,
    unit_price: unitPrice.value,
    quantity: quantity.value,
  };

  const errors = validateItem(item);
  if (Object.keys(errors).length > 0) {
    displayFormErrors(errors);
    return;
  }

  const userInfo = localStorage.getItem('userInfo');
  const token = JSON.parse(userInfo).token;

  submitBtn.classList.add('is-loading');
  submitBtn.disabled = true;

  fetch('https://fast-food-fast-service.herokuapp.com/api/v1/menu', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(item),
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    }),
  }).then(res => res.json())
    .then((response) => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;

      if (response.errors) {
        displayFormErrors(response.errors);
        return;
      }
      if (response.error) {
        displayFormErrors({ global: response.error });
        return;
      }

      const message = {
        text: 'Food item created successfully',
        type: 'success',
      };

      localStorage.setItem('message', JSON.stringify(message));
      window.location.href = 'food_items.html';
    })
    .catch(error => console.error('Error:', error));
}

submitBtn.addEventListener('click', createItem);

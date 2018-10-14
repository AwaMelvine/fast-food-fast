const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const formInfo = document.getElementById('form-info');

function loginValidation(user) {
  const errors = {};
  if (!user.username || user.username === '') {
    errors.username = 'Username / Email is required';
  }
  if (!user.password || user.password === '') {
    errors.password = 'Password is required';
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

function loginUser(e) {
  e.preventDefault();
  formInfo.innerHTML = '';

  const user = {
    username: username.value,
    password: password.value,
  };
  console.log(user);

  const errors = loginValidation(user);
  if (Object.keys(errors) > 0) {
    displayFormErrors(errors);
  }

  fetch('https://fast-food-fast-service.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(user),
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }),
  }).then(res => res.json())
    .then((response) => {
      if (response.errors) {
        displayFormErrors(response.errors);
        return;
      }
      const userInfo = {
        token: response.data.token,
        id: response.data.user.id,
        username: response.data.user.username,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.location.href = 'index.html';
    })
    .catch(error => console.error('Error:', error));
}

loginBtn.addEventListener('click', loginUser);

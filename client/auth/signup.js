function signUpValidation(user) {
  const errors = {};
  if (user.username && user.username.length < 3 && user.username.length > 50) {
    errors.username = 'Username must have between 3 to 50 characters';
  }
  if (!user.username || user.username === '') {
    errors.username = 'Username is required';
  }
  if (!user.email || user.email === '') {
    errors.email = 'Email is required';
  }
  if (user.password && user.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long and contain at least a number';
  }
  if (!user.password || user.password === '') {
    errors.password = 'Password is required';
  }
  if (user.password !== user.passwordConf) {
    errors.password = 'The two passwords do not match';
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

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConf = document.getElementById('passwordConf');
const submitBtn = document.getElementById('submitBtn');
const formInfo = document.getElementById('form-info');

function signupUser(e) {
  e.preventDefault();
  formInfo.innerHTML = '';

  const user = {
    username: username.value,
    email: email.value,
    password: password.value,
    passwordConf: passwordConf.value,
  };

  const errors = signUpValidation(user);
  if (Object.keys(errors) > 0) {
    displayFormErrors(errors);
  }

  fetch('https://fast-food-fast-service.herokuapp.com/api/v1/auth/signup', {
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
        role: response.data.user.role,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.location.href = 'index.html';
    })
    .catch(error => console.error('Error:', error));
}

submitBtn.addEventListener('click', signupUser);

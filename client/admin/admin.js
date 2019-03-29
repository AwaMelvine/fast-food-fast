const userInfoLink = document.getElementById('user-info-link');
const rootUrl = 'http://localhost:5000';

const cart = JSON.parse(localStorage.getItem('cart'));
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// display user info
userInfoLink.innerHTML = `<span>
    <i class="fa fa-user"></i>
    ${userInfo.username}
    <br>
    <button onclick="logout()" id="logout-link">logout</button>
    </span>`;

function logout() {
  localStorage.removeItem('userInfo');
  window.location.href = '../index.html';
}


function adminOnly() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo.role !== 'admin') {
    window.location.href = '../index.html';
  }
}

adminOnly();

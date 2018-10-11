const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.menu-links');
const nav = document.getElementsByTagName('nav')[0];

menuIcon.addEventListener('click', (e) => {
  navLinks.classList.toggle('showing');
});

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop >= 30) {
    nav.classList.add('solid');
  } else {
    nav.classList.remove('solid');
  }
});

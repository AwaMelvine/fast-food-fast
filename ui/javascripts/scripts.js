var menuIcon = document.querySelector('.menu-icon');
var navLinks = document.querySelector('.menu-links');
var nav = document.getElementsByTagName('nav')[0];

menuIcon.addEventListener('click', function (e) {
  navLinks.classList.toggle('showing');
});

window.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop >= 30) {
    nav.classList.add('solid');
  } else {
    nav.classList.remove('solid');
  }
});
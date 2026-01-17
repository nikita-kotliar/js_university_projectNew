const currentPage = window.location.pathname;

const homeLink = document.getElementById('homeLink');
const favoritesLink = document.getElementById('favoritesLink');

homeLink.classList.remove('active');
favoritesLink.classList.remove('active');

if (currentPage.includes('index.html')) {
  homeLink.classList.add('active');
} else if (currentPage.includes('favorites.html')) {
  favoritesLink.classList.add('active');
}

const openMenuButton = document.querySelector('.open-mobile-menu-btn');
const closeMenuButton = document.querySelector('.close-mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu-wrapper');

openMenuButton.addEventListener('click', function () {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('not-scrollable');
});

closeMenuButton.addEventListener('click', function () {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('not-scrollable');
});


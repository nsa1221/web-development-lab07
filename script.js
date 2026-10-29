document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const htmlTag = document.documentElement;

  const btnMobile = document.getElementById('btnMobile');
  const btnDesktop = document.getElementById('btnDesktop');
  const deviceViewport = document.getElementById('deviceViewport');

  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');

  const flipCards = document.querySelectorAll('.flip-card');

  // Dark / Light Mode Toggle
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      htmlTag.setAttribute('data-theme', 'light');
      themeIcon.className = 'fa-solid fa-sun';
      themeText.textContent = 'Light Mode: ON';
    } else {
      htmlTag.setAttribute('data-theme', 'dark');
      themeIcon.className = 'fa-solid fa-moon';
      themeText.textContent = 'Dark Mode: ON';
    }
  });

  // Viewport Switcher
  btnMobile.addEventListener('click', () => {
    deviceViewport.classList.remove('desktop-view');
    deviceViewport.classList.add('phone-view');
    btnMobile.classList.add('active');
    btnDesktop.classList.remove('active');
  });

  btnDesktop.addEventListener('click', () => {
    deviceViewport.classList.remove('phone-view');
    deviceViewport.classList.add('desktop-view');
    btnDesktop.classList.add('active');
    btnMobile.classList.remove('active');
  });

  // Mobile Menu Toggle
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');
  });

  // 3D Flip Card Flip Action
  flipCards.forEach(card => {
    const backBtn = card.querySelector('.flip-back-btn');

    card.addEventListener('click', (e) => {
      if (e.target === backBtn) {
        card.classList.remove('flipped');
      } else {
        card.classList.toggle('flipped');
      }
    });
  });
});
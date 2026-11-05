document.addEventListener('DOMContentLoaded', () => {
  const htmlTag = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const btnMobile = document.getElementById('btnMobile');
  const btnDesktop = document.getElementById('btnDesktop');
  const deviceViewport = document.getElementById('deviceViewport');
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const flipCards = document.querySelectorAll('.flip-card');

  // ---------- Dark / Light mode (сонголтыг санана) ----------
  function applyTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    themeText.textContent = isDark ? 'Dark' : 'Light';
    try { localStorage.setItem('lab06-theme', theme); } catch (e) { /* storage хаалттай бол алгасна */ }
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('lab06-theme'); } catch (e) {}
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  themeToggleBtn.addEventListener('click', () => {
    applyTheme(htmlTag.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // ---------- Утас / Компьютер харагдац ----------
  function setView(mode) {
    const isMobile = mode === 'mobile';
    deviceViewport.classList.toggle('phone-view', isMobile);
    deviceViewport.classList.toggle('desktop-view', !isMobile);
    btnMobile.classList.toggle('active', isMobile);
    btnDesktop.classList.toggle('active', !isMobile);
    closeMenu();
  }
  btnMobile.addEventListener('click', () => setView('mobile'));
  btnDesktop.addEventListener('click', () => setView('desktop'));

  // ---------- Гар утасны цэс ----------
  function closeMenu() {
    navbar.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  menuToggle.addEventListener('click', () => {
    const open = navbar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // ---------- Цэсний идэвхтэй холбоосыг scroll-той уялдуулах ----------
  const sections = [...navLinks]
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // ---------- 3D Flip картууд ----------
  flipCards.forEach(card => {
    const toggle = () => card.classList.toggle('flipped');

    card.addEventListener('click', e => {
      if (e.target.closest('.flip-back-btn')) {
        card.classList.remove('flipped');
        card.blur();            // hover-ээр дахин эргэхээс сэргийлнэ
      } else {
        toggle();
      }
    });

    // Гараар (Enter / Space) удирдах
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});
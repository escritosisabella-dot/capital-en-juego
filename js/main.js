/**
 * Capital en Juego — Script Principal (js/main.js)
 * Interactividad nativa: navegación, filtrado de galería, conmutador de logos y UI
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Conmutador del Logotipo Showcase en Hero
  const btnOriginal = document.getElementById('btn-original');
  const btnBadge = document.getElementById('btn-badge');
  const imgLogo = document.getElementById('showcase-logo-img');

  if (btnOriginal && btnBadge && imgLogo) {
    btnOriginal.addEventListener('click', () => {
      btnOriginal.classList.add('active');
      btnBadge.classList.remove('active');
      imgLogo.src = 'assets/logo.png';
      imgLogo.alt = 'Logotipo Oficial Capital en Juego';
    });

    btnBadge.addEventListener('click', () => {
      btnBadge.classList.add('active');
      btnOriginal.classList.remove('active');
      imgLogo.src = 'assets/logo-transparent.png';
      imgLogo.alt = 'Insignia Flotante Capital en Juego';
    });
  }

  // 2. Filtro de Categorías en Galería
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      galleryItems.forEach(item => {
        if (category === 'todas' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 3. Efecto Navbar en Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
      navbar.style.borderBottomColor = 'rgba(244, 179, 40, 0.2)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  });

  // 4. Menú móvil interactivo
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#06090e';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
      }
    });
  }

  console.log('✅ Capital en Juego: Sistema interactivo cargado sin dependencias.');
});

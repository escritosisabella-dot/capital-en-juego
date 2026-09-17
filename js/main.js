/**
 * Capital en Juego — Motor de Animaciones Lúdicas & UI (js/main.js)
 * Efectos elásticos, rebote de caricatura (Rubberhose), inclinación 3D y scroll reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Animación de rebote gelatinoso al hacer clic en el Emblema Oficial
  const emblemWrapper = document.querySelector('.emblem-wrapper');
  if (emblemWrapper) {
    emblemWrapper.addEventListener('click', () => {
      emblemWrapper.classList.remove('wobble-active');
      void emblemWrapper.offsetWidth; // Forzar reflujo para reiniciar la animación
      emblemWrapper.classList.add('wobble-active');
      
      // Sonido o vibración háptica suave si el dispositivo lo soporta
      if (navigator.vibrate) {
        navigator.vibrate([30, 40, 30]);
      }
    });
  }

  // 2. Efecto de inclinación 3D interactivo en la tarjeta del Emblema
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / rect.height) * 16;
      const rotateY = (x / rect.width) * 16;
      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // 3. Filtro interactivo de la Galería con animación pop
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'todas' || itemCategory === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, index * 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.92)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. Animaciones de revelado elásticas al hacer scroll (Intersection Observer)
  const revealElements = document.querySelectorAll('.feature-card, .objective-card, .concept-card, .step-card, .company-card, .gallery-item, .section-header');
  
  revealElements.forEach(el => el.classList.add('reveal-init'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('reveal-visible');
          }, 80);
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-visible'));
  }

  // 5. Navbar Scrolled Glassmorphism Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 6. Menú móvil
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
        navLinks.style.background = '#0a1411';
        navLinks.style.padding = '1.75rem';
        navLinks.style.borderBottom = '3px solid var(--gold-bright)';
      }
    });
  }

  console.log('⚽ Capital en Juego: Motor de animaciones retro-cartoon activo.');
});
